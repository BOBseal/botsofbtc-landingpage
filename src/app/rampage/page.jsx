
import { Suspense } from 'react';
import Rampage from "../../components/Rampage"

export default function RampagePage() {
  return (
    <Suspense fallback={<div>
      INVALID LINK DETECTED
    </div>}>
      <Rampage />
    </Suspense>
  );
}
