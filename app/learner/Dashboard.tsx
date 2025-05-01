'use client';

import PredictForm from '@/components/PredictForm';

export default function Dashboard() {
  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">🧠 AI Match Predictor</h1>
      <PredictForm />
    </div>
  );
}
