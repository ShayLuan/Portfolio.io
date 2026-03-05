import React, { useState } from 'react';

const WELCOME_MESSAGE = "Hi! I'm the portfolio assistant. Ask me anything about the work and experience here—or suggest an interview time. (Real AI replies coming in Phase 4.)";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setInput('');
    // Phase 2: no API yet — add user message + placeholder reply in one update
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: trimmed },
      { role: 'assistant', content: "Got it! (Chat API will replace this in Phase 4.)" },
    ]);
  };

  return (
    <>
      {/* Floating button — fixed bottom-right, high z-index so it sits above page content */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat panel — only when open; max height so it doesn’t take full screen on mobile */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-[100] flex w-[min(100vw-3rem,380px)] flex-col overflow-hidden rounded-xl border border-gray-600 bg-gray-800 shadow-xl"
          style={{ maxHeight: 'min(70vh, 420px)' }}
        >
          <div className="border-b border-gray-600 px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-100">Chat</h2>
          </div>

          {/* Scrollable message list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'ml-8 bg-emerald-600/80 text-white'
                    : 'mr-8 bg-gray-700 text-gray-100'
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          {/* Input and send */}
          <form onSubmit={handleSend} className="border-t border-gray-600 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                maxLength={2000}
              />
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
