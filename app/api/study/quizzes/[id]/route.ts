import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const quiz = DataStore.getQuizById(params.id);
    if (!quiz) {
      return NextResponse.json({ success: false, error: 'Quiz not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: quiz });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const quiz = DataStore.getQuizById(params.id);
    if (!quiz) {
      return NextResponse.json({ success: false, error: 'Quiz not found' }, { status: 404 });
    }

    const body = await request.json();
    const { user_id = 'usr-demo-1', selected_answers = [] } = body;

    // Calculate score
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (selected_answers[idx] === q.correct_index) {
        score++;
      }
    });

    const attempt = DataStore.submitQuizAttempt({
      user_id,
      quiz_id: quiz.id,
      quiz_title: quiz.title,
      score,
      total: quiz.questions.length,
      selected_answers
    });

    return NextResponse.json({
      success: true,
      data: {
        attempt,
        score,
        total: quiz.questions.length,
        percentage: Math.round((score / quiz.questions.length) * 100),
        questions: quiz.questions
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
