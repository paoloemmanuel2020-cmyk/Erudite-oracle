
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { QuestionControls } from './components/QuestionControls';
import { AnswerDisplay } from './components/AnswerDisplay';
import { generateQuestion, getTechnicalAnswer } from './services/geminiService';
import { Category } from './types';

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetAnswer = useCallback(async (currentQuestion: string) => {
    if (!currentQuestion) return;

    setIsLoading(true);
    setError(null);
    setAnswer('');
    try {
      const result = await getTechnicalAnswer(currentQuestion);
      setAnswer(result);
    } catch (e) {
      setError('An error occurred while communicating with the oracle. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGenerateQuestion = useCallback(async (category: Category) => {
    setIsGenerating(true);
    setError(null);
    setQuestion('');
    setAnswer('');
    try {
      const generatedQ = await generateQuestion(category);
      setQuestion(generatedQ);
      await handleGetAnswer(generatedQ);
    } catch (e) {
      setError('Failed to generate a question. Please try again.');
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  }, [handleGetAnswer]);

  const handleSubmitCustomQuestion = useCallback((customQuestion: string) => {
    setQuestion(customQuestion);
    handleGetAnswer(customQuestion);
  }, [handleGetAnswer]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <Header />
        
        <main className="flex flex-col gap-8">
          <QuestionControls
            onGenerate={handleGenerateQuestion}
            onSubmit={handleSubmitCustomQuestion}
            isGenerating={isGenerating}
            isLoading={isLoading}
          />
          <AnswerDisplay
            question={question}
            answer={answer}
            isLoading={isLoading || isGenerating}
            error={error}
          />
        </main>

        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>Powered by the Erudite Oracle. All knowledge is provisional.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
