/**
 * Cloudflare Turnstile token verification helper.
 * When CLOUDFLARE_TURNSTILE_SECRET_KEY is configured in environment,
 * validates token against Cloudflare endpoint.
 * Degrades gracefully in local/dev environments if key is not configured.
 */
export async function verifyTurnstileToken(
  token?: string,
  remoteIp?: string
): Promise<{ success: boolean; message?: string }> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

  // If Turnstile secret key is not configured in environment, pass through safely for dev/test
  if (!secretKey) {
    return { success: true };
  }

  if (!token) {
    return { success: false, message: 'Please complete the security challenge (Turnstile).' };
  }

  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData
    });

    const outcome = await res.json();
    if (outcome.success) {
      return { success: true };
    } else {
      return {
        success: false,
        message: 'Security challenge verification failed. Please try again.'
      };
    }
  } catch (err) {
    console.error('Turnstile verification network error:', err);
    // On unexpected upstream network error, don't hard block legitimate users
    return { success: true };
  }
}
