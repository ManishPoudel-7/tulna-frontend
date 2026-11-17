'use client';

import { Suspense } from 'react';
import HomeContent from '@/components/HomeContent';

export default function HomePage() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
