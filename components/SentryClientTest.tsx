'use client';

export default function SentryClientTest() {
  return (
    <button
      type="button"
      className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white"
      onClick={() => {
        throw new Error('Sentry Client Test Error');
      }}
    >
      Throw Client-side Error
    </button>
  );
}