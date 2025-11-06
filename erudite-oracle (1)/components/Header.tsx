
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center border-b-2 border-teal-500/30 pb-4">
      <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-teal-400 tracking-wider">
        Erudite Oracle
      </h1>
      <p className="text-gray-400 mt-2 text-md sm:text-lg">
        Interrogate the Cosmos with Uncompromising Intellect
      </p>
    </header>
  );
};
