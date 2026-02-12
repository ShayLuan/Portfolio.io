import React, { useState } from 'react';

const INITIAL_PAGES = [
  { id: 1, label: 'Home' },
  { id: 2, label: 'About' },
  { id: 3, label: 'GitHub' }
];

export default function BrowserHistoryShowcase() {
  const [history, setHistory] = useState(INITIAL_PAGES);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_PAGES.length - 1);
  const [visitInput, setVisitInput] = useState('');

  const currentPage = history[currentIndex];
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  const goBack = () => {
    if (canGoBack) setCurrentIndex((i) => i - 1);
  };

  const goForward = () => {
    if (canGoForward) setCurrentIndex((i) => i + 1);
  };

  const visitPage = (e) => {
    e.preventDefault();
    const label = visitInput.trim() || 'New Page';
    setHistory((prev) => prev.slice(0, currentIndex + 1).concat([{ id: Date.now(), label }]));
    setCurrentIndex((prev) => prev + 1);
    setVisitInput('');
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-bold text-cyan-300 mb-2">Browser History (Doubly Linked List)</h3>
      <p className="text-gray-300 text-sm mb-4">
        Each &quot;page&quot; is a node with prev/next. <br />Back = move to previous node; <br />Forward = move to next; <br />Visit = add a new node and truncate forward history.
      </p>

      <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
        <p className="text-gray-400 text-sm mb-1">Current page</p>
        <p className="text-emerald-400 font-medium text-xl">{currentPage?.label ?? '—'}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={goBack}
          disabled={!canGoBack}
          className="px-4 py-2 rounded-md font-medium bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={goForward}
          disabled={!canGoForward}
          className="px-4 py-2 rounded-md font-medium bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700 transition-colors"
        >
          Forward
        </button>
      </div>

      <form onSubmit={visitPage} className="flex flex-wrap gap-2">
        <input
          type="text"
          value={visitInput}
          onChange={(e) => setVisitInput(e.target.value)}
          placeholder="Visit a new page..."
          className="flex-1 min-w-[120px] px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md font-medium bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
        >
          Visit
        </button>
      </form>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-gray-400 text-xs mb-2">History (current highlighted)</p>
        <div className="flex flex-wrap gap-2">
          {history.map((page, i) => (
            <span
              key={page.id}
              className={`px-2 py-1 rounded text-sm ${i === currentIndex ? 'bg-cyan-600/50 text-cyan-200 font-medium' : 'bg-gray-700/50 text-gray-400'}`}
            >
              {page.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
