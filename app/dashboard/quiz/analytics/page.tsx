"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
interface Attempt {
  id: string;
  topic: string;
  percentage: number;
  created_at: string;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const res = await fetch("/api/quiz-analytics");
    const result = await res.json();

    setData(result);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">
        Quiz Analytics
      </h1>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="border rounded-xl p-4">
          <h3>Total Quizzes</h3>
          <p className="text-3xl font-bold">
            {data.cards.totalQuizzes}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <h3>Average Score</h3>
          <p className="text-3xl font-bold">
            {data.cards.averageScore.toFixed(1)}%
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <h3>Best Score</h3>
          <p className="text-3xl font-bold">
            {data.cards.bestScore.toFixed(1)}%
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <h3>Total Questions</h3>
          <p className="text-3xl font-bold">
            {data.cards.totalQuestions}
          </p>
        </div>

      </div>
    <div className="border rounded-xl p-4">
      <h2 className="font-bold mb-4">
        Performance Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data.attempts}>
          <XAxis dataKey="topic" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="percentage"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
}