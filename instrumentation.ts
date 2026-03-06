// Sentry instrumentation
// Uncomment after installing @sentry/nextjs:
// import * as Sentry from '@sentry/nextjs';
// 
// export async function register() {
//   if (process.env.NEXT_RUNTIME === 'nodejs') {
//     await import('./sentry.server.config');
//   }
//   if (process.env.NEXT_RUNTIME === 'edge') {
//     await import('./sentry.edge.config');
//   }
// }
// 
// export const onRequestError = Sentry.captureRequestError;

export async function register() {
  // Instrumentation registration
}

export const onRequestError = (error: Error) => {
  console.error(error);
};
