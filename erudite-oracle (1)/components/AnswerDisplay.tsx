
import React from 'react';
import { Spinner } from './Spinner';

interface AnswerDisplayProps {
  question: string;
  answer: string;
  isLoading: boolean;
  error: string | null;
}

// A simple markdown-to-HTML parser for demonstration
const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    const elements = lines.map((line, index) => {
        if (line.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-teal-400">{line.substring(4)}</h3>;
        }
        if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-teal-300">{line.substring(3)}</h2>;
        }
        if (line.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-teal-200">{line.substring(2)}</h1>;
        }
        if (line.startsWith('* ')) {
            return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
            return <br key={index} />;
        }
        return <p key={index} className="mb-4">{line}</p>;
    });
    return <>{elements}</>;
};


export const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ question, answer, isLoading, error }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 min-h-[20rem]">
      <h2 className="font-serif text-2xl text-teal-400 mb-4 border-b border-gray-700 pb-2">The Oracle's Response</h2>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-full pt-16">
          <Spinner />
          <p className="mt-4 text-gray-400">Contemplating the query...</p>
        </div>
      )}
      
      {error && (
        <div className="text-red-400 bg-red-900/30 p-4 rounded-md">
          <p className="font-semibold">A Perturbation Occurred</p>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && !question && (
        <div className="flex items-center justify-center h-full pt-16">
          <p className="text-gray-500">The ether is silent. Pose a question to begin.</p>
        </div>
      )}
      
      {!isLoading && !error && question && (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-400 mb-2">Your Inquiry:</h3>
            <p className="font-serif text-xl italic text-gray-200">"{question}"</p>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-li:text-gray-300 font-serif leading-relaxed text-lg">
                <SimpleMarkdown content={answer} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
