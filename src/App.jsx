import React from 'react';
import CharacterWizard from './components/CharacterWizard';
import { RotateCcw } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen text-white relative">
      <header className="fixed top-0 w-full z-50 bg-[#12181b]/95 backdrop-blur-xl border-b border-dark-border py-4 px-8 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-fuchsia-300">
            D&D 5e Character Generator
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('trigger-load-character'))}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white transition-all text-xs font-bold"
          >
            Load
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('save-character'))}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white transition-all text-xs font-bold"
          >
            Save
          </button>

          <div className="w-[1px] h-8 bg-gray-800 mx-1"></div>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset your character? This will clear all progress.")) {
                window.dispatchEvent(new CustomEvent('reset-character'));
              }
            }}
            className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all flex items-center justify-center"
            title="Reset Character"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </header>

      <main className="pt-32 pb-20 px-4">
        <CharacterWizard />
      </main>

      <footer className="fixed bottom-0 w-full z-50 bg-black/80 backdrop-blur-md border-t border-dark-border py-4 text-center text-sm text-gray-500">
        <a
          href="https://github.com/hardlynoticeable/VonipoGen"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-400 transition-colors font-medium"
        >
          Vonipo Character Generator - Github
        </a>
      </footer>
    </div>
  );
}

export default App;
