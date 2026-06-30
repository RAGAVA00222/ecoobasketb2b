export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919342358226"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Ecoo Basket on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition hover:bg-green-700"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M19.11 4.89A8.84 8.84 0 0 0 4.89 19.11L3 21l1.9-1.9a8.84 8.84 0 0 0 13.2-13.2ZM12 19.2a7.18 7.18 0 0 1-3.64-1l-.26-.15-1.13.3.3-1.1-.16-.26a7.2 7.2 0 1 1 4.89 2.21Zm4.03-5.31c-.22-.11-1.3-.64-1.5-.71-.2-.07-.34-.11-.49.11-.15.22-.57.71-.7.86-.13.15-.26.17-.48.06a5.87 5.87 0 0 1-1.72-1.06 6.48 6.48 0 0 1-1.2-1.5c-.13-.22 0-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.49-1.19-.67-1.63-.18-.44-.37-.38-.49-.38h-.42c-.15 0-.39.05-.59.28-.2.23-.76.74-.76 1.81s.78 2.1.89 2.24c.11.15 1.53 2.34 3.71 3.27.52.22.93.35 1.25.45.52.16 1 .14 1.38.08.42-.06 1.3-.53 1.49-1.04.19-.51.19-.94.13-1.03-.07-.09-.2-.14-.42-.25Z" />
      </svg>
    </a>
  );
}
