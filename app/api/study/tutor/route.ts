import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the CivicTrust AI Study Partner and patient academic tutor.
Your core principles:
1. Be patient, encouraging, and clear.
2. Rather than simply giving raw answers, explain the underlying logic, derivations, and principles step-by-step.
3. Use relatable real-world examples (including practical Nigerian and STEM contexts like electrical wiring, inverters, physics of machines, biology, and algebra).
4. After explaining, offer a short follow-up question or suggest: "Would you like me to give you a quick practice question on this?"
5. Format your answers neatly using markdown bullet points and bold key terms.`;

function generatePedagogicalFallback(query: string, mode?: string): string {
  const clean = query.toLowerCase();

  if (clean.includes('gfci') || clean.includes('rcd') || clean.includes('breaker') || clean.includes('leakage')) {
    return `### Understanding RCDs & Circuit Breakers ⚡

Great electrical question! Let's break this down step-by-step:

1. **Standard Circuit Breakers (MCBs)**:
   - **Purpose**: Protects the **cables and building** from catching fire.
   - **How it works**: Trips if too much current flows through the circuit (e.g. drawing 30 Amps through a 15 Amp wire) or during a direct short circuit (Live touching Neutral).

2. **RCD / GFCI (Residual Current Device / Ground Fault Interrupter)**:
   - **Purpose**: Protects **human life** from lethal electric shock.
   - **How it works**: Continuously compares the current leaving through the Live wire against the current returning through the Neutral wire. If there is even a tiny discrepancy (e.g., 30 milliamperes leaking through a person's hand or into water), it cuts off power in less than 40 milliseconds!

**Key Takeaway**:
- A breaker stops your cables from melting.
- An RCD/GFCI stops your heart from fibrillating during a shock.

*Would you like me to quiz you on this concept or show you how an Earth Leakage Circuit Breaker (ELCB) is wired into an ATS panel?*`;
  }

  if (clean.includes('ohm') || clean.includes('voltage') || clean.includes('current') || clean.includes('resistance')) {
    return `### Ohm's Law Explained Simply 🔌

Let's use the classic water pipe analogy:

- **Voltage ($V$)**: Think of water pressure from an elevated overhead tank. The higher the tank, the more push it exerts.
- **Current ($I$)**: Think of the flow rate of the water (litres per second) passing through the pipe. Measured in **Amperes**.
- **Resistance ($R$)**: Think of the thickness or constriction of the pipe. A narrow pipe resists flow; a wide pipe allows easy flow. Measured in **Ohms (Ω)**.

### The Fundamental Law:
$$V = I \\times R$$
- To increase Current ($I$), you either raise the Voltage ($V$) or lower the Resistance ($R$).

### Practical Example:
If you plug a 240V water heater that has an internal element resistance of 20Ω:
$$I = \\frac{V}{R} = \\frac{240}{20} = 12\\text{ Amps}$$

*Would you like to try calculating the power in Watts ($P = V \\times I$) for this heater?*`;
  }

  if (clean.includes('quadratic') || clean.includes('algebra') || clean.includes('roots')) {
    return `### Solving Quadratic Equations: Step-by-Step 📐

The standard quadratic equation is written as:
$$ax^2 + bx + c = 0$$

### Three Ways to Solve:
1. **Factoring** (Fastest when roots are whole numbers):
   - Find two numbers that multiply to $a \\times c$ and add up to $b$.
   - Example: $x^2 - 5x + 6 = 0 \\rightarrow (x - 2)(x - 3) = 0 \\rightarrow x = 2 \\text{ or } 3$.

2. **The Quadratic Formula** (Works for every quadratic):
   $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

3. **Completing the Square** (The algebraic derivation behind the formula).

**Quick Check Question**:
What is the discriminant ($b^2 - 4ac$) for $x^2 - 4x + 4 = 0$, and what does it tell you about the roots?`;
  }

  if (mode === 'simply') {
    return `### Simple Breakdown 💡

In very plain language:
**"${query}"** comes down to one core idea:

Whenever you break complex systems into their smallest moving pieces, every rule has an input, a process, and an expected outcome.

- **Step 1**: Identify what you are given.
- **Step 2**: Identify what you want to find.
- **Step 3**: Apply the single rule that connects them.

Would you like me to walk through a concrete, step-by-step example together?`;
  }

  return `### Step-by-Step Guidance 📚

Thank you for bringing up **"${query}"**! As your CivicTrust study tutor, let's explore this together:

1. **The Core Concept**:
   Understanding this topic starts with defining what principles govern it. In both academic examinations and practical applications, clarity on the fundamentals is 80% of the mastery.

2. **How to Think About It**:
   Break the question down into what is known and what unknown variables need to be derived or clarified.

3. **Next Steps**:
   - Would you like me to:
     - **Explain this simply** with an everyday analogy?
     - **Show you step by step** how a typical exam question on this is solved?
     - **Quiz you** with a fast multiple-choice check?`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, mode, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        // Construct prompt with system instructions and user message
        const promptText = `${SYSTEM_PROMPT}\n\nStudent question / request: ${message}${
          mode ? `\n(Focus mode requested by student: ${mode})` : ''
        }`;

        console.log('[Tutor] Calling Gemini API with key prefix:', apiKey ? apiKey.substring(0, 6) + '...' : 'none');
        
        // Try modern Gemini model endpoints
        const modelNames = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-pro'];
        let candidateText: string | null = null;

        for (const model of modelNames) {
          try {
            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ parts: [{ text: promptText }] }],
                  generationConfig: {
                    temperature: 0.6,
                    maxOutputTokens: 800
                  }
                })
              }
            );

            if (geminiRes.ok) {
              const geminiData = await geminiRes.json();
              candidateText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (candidateText) {
                console.log(`[Tutor] Successfully generated response with model: ${model}`);
                return NextResponse.json({
                  success: true,
                  data: {
                    reply: candidateText,
                    source: `gemini (${model})`
                  }
                });
              }
            }
          } catch (mErr) {
            // continue to next model
          }
        }
      } catch (geminiErr: any) {
        console.warn('[Tutor] Gemini request error:', geminiErr?.message || geminiErr);
      }
    }

    // Graceful fallback pedagogical tutor engine
    const fallbackReply = generatePedagogicalFallback(message, mode);
    return NextResponse.json({
      success: true,
      data: {
        reply: fallbackReply,
        source: 'civictrust-tutor-engine'
      }
    });
  } catch (err: any) {
    console.error('[Tutor] Handler error:', err);
    // Never crash or return 500 to student — fallback gracefully
    const fallbackReply = generatePedagogicalFallback('study guide', 'general');
    return NextResponse.json({
      success: true,
      data: {
        reply: fallbackReply,
        source: 'civictrust-tutor-engine'
      }
    });
  }
}
