
import { Suspense } from 'react';
import DashboardClient from './DashboardClient';

export default function DashboardPage() {
  return (
    <Suspense fallback={<p className="text-white">Loading...</p>}>
      <DashboardClient />
    </Suspense>
  );
}
