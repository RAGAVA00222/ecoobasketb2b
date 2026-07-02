'use server';

export async function throwServerError() {
  console.log('Throwing a server error...');
  throw new Error('Sentry Server Action Test Error');
}