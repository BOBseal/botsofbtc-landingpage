import { Suspense } from 'react';
import BOBMint from "../../components/BOBMint";

export default function RampagePage() {
  return (
    <Suspense fallback={<div>
      INVALID LINK DETECTED
    </div>}>
      <BOBMint />
    </Suspense>
  );
}