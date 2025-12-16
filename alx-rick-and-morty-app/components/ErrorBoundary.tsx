import React, { ReactNode } from 'react';
// Import the Sentry SDK
import * as Sentry from '@sentry/react'; 

// --- Interface Definitions ---

interface ErrorBoundaryProps {
  children: ReactNode; 
}

interface State {
  hasError: boolean;
}

// --- ErrorBoundary Component ---

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  // 1. Initial State Setup
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // 2. State Derivation (Triggers Fallback UI)
  static getDerivedStateFromError(error: Error): State {
    // This logs the error locally for the developer, but doesn't send it yet.
    console.error("An error occurred in a child component:", error);
    return { hasError: true };
  }

  // 3. Side Effects (Logging to Sentry)
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Use Sentry's captureException to send the error.
    // errorInfo provides the component stack trace.
    Sentry.captureException(error, { extra: errorInfo });

    // Keep local logging for consistency
    console.log("Error Reported to Sentry:", { error, errorInfo });
  }

  // 4. Render Logic
  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{ padding: '20px', border: '1px solid red', margin: '10px' }}>
          <h2>Oops, there is an error!</h2>
          <p>We've been notified about this issue. Please try again.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{ marginTop: '10px', padding: '8px 15px', cursor: 'pointer' }}
          >
            Try again?
          </button>
        </div>
      );
    }

    // Normally render the child components
    return this.props.children;
  }
}

export default ErrorBoundary;