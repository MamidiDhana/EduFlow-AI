import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("quiz_attempts")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;

    const totalQuizzes = data.length;

    const averageScore =
      totalQuizzes > 0
        ? data.reduce((sum, item) => sum + item.percentage, 0) /
          totalQuizzes
        : 0;

    const bestScore =
      totalQuizzes > 0
        ? Math.max(...data.map((item) => item.percentage))
        : 0;

    const totalQuestions = data.reduce(
      (sum, item) => sum + item.total_questions,
      0
    );

    return NextResponse.json({
      cards: {
        totalQuizzes,
        averageScore,
        bestScore,
        totalQuestions,
      },
      attempts: data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}