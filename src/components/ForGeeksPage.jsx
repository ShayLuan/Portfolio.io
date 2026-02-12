import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dsList } from '../data/dsAlgoData';

export default function ForGeeksPage() {
  const [selectedDS, setSelectedDS] = useState(dsList[0]?.id ?? '');
  const [activeTab, setActiveTab] = useState('showcase');

  const currentDS = dsList.find((ds) => ds.id === selectedDS);

  if (!currentDS) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 pt-20 px-8 pb-8">
        <p>No data structure selected.</p>
      </div>
    );
  }

  const ShowcaseComponent = currentDS.ShowcaseComponent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 pt-20 pb-6 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-cyan-400">Data Structure & Algorithms Showcase</h1>

        <div className="mb-6">
          <label htmlFor="ds-select" className="block text-sm font-medium text-gray-300 mb-2">
            Select Data Structure
          </label>
          <select
            id="ds-select"
            value={selectedDS}
            onChange={(e) => setSelectedDS(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          >
            {dsList.map((ds) => (
              <option key={ds.id} value={ds.id}>
                {ds.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex border-b border-gray-700 mb-4">
          {['showcase', 'python', 'cpp'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize ${
                activeTab === tab
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab === 'showcase' ? 'Use Case' : tab === 'cpp' ? 'C++' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {activeTab === 'showcase' && (
            <div>
              <p className="text-gray-300 italic px-6 pt-4 pb-2">{currentDS.description}</p>
              {ShowcaseComponent && <ShowcaseComponent />}
            </div>
          )}

          {activeTab === 'python' && (
            <div className="p-0">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={{ margin: 0, borderRadius: 0 }}
                showLineNumbers
              >
                {currentDS.python}
              </SyntaxHighlighter>
            </div>
          )}

          {activeTab === 'cpp' && (
            <div className="p-0">
              <SyntaxHighlighter
                language="cpp"
                style={oneDark}
                customStyle={{ margin: 0, borderRadius: 0 }}
                showLineNumbers
              >
                {currentDS.cpp}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
