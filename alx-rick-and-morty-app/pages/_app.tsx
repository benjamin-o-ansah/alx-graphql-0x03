import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as Sentry from '@sentry/react';

// Get your DSN from your Sentry project settings
const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN; 

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    // Adjust tracesSampleRate to control performance monitoring data
    tracesSampleRate: 1.0, 
    // Add other integrations as needed
  });
}
// ... rest of your _app.js code
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
