// components/ErrorProneComponent.tsx
import { useState } from 'react';

export default function ErrorProneComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    // This will cause the component to crash and be caught by the ErrorBoundary
    throw new Error("This is a forced test error for Sentry logging.");
  }

  return (
    <button 
      onClick={() => setShouldThrow(true)}
      style={{ padding: '10px', backgroundColor: 'salmon', color: 'white' }}
    >
      Click to Cause Error (Test Sentry)
    </button>
  );
}