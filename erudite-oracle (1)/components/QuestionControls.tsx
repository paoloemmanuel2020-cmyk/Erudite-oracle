
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface QuestionControlsProps {
  onGenerate: (category: Category) => void;
  onSubmit: (question: string) => void;
  isGenerating: boolean;
  isLoading: boolean;
}

export const QuestionControls: React.FC<QuestionControlsProps> = ({ onGenerate, onSubmit, isGenerating, isLoading }) => {
  const [customQuestion, setCustomQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customQuestion.trim() && !isLoading && !isGenerating) {
      onSubmit(customQuestion.trim());
      setCustomQuestion('');
    }
  };

  const isDisabled = isGenerating || isLoading;

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700">
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-teal-400 mb-4">Generate an Inquiry</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onGenerate(category)}
              disabled={isDisabled}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-teal-600 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6">
        <h2 className="font-serif text-2xl text-teal-400 mb-4">Or, Posit Your Own Query</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <textarea
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="E.g., What is the real definition of 0 and why did Parmenides say it doesn't exist?"
            className="flex-grow bg-gray-900/80 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 resize-none"
            rows={2}
            disabled={isDisabled}
          />
          <button
            type="submit"
            disabled={isDisabled || !customQuestion.trim()}
            className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
