import { Suspense } from 'react';
import Rampage from "../../components/Rampage"

export default function RampagePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Rampage />
    </Suspense>
  );
}
