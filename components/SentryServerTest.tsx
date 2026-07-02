import { throwServerError } from '@/app/actions';

export default function SentryServerTest() {
  return (
    <form action={throwServerError}>
      <button
        type="submit"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Throw Server-side Error
      </button>
    </form>
  );
}