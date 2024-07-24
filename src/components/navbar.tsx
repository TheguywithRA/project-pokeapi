import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import { Link } from 'react-router-dom';
import React from 'react';
import { usePokeDex } from '../context/pokedexcontext';

interface NavBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  toggleTheme: () => void; 
  theme: string; 
}

const NavBar: React.FC<NavBarProps> = ({ searchQuery, setSearchQuery, handleSearch, toggleTheme, theme }) => {
  const { addedPokemons } = usePokeDex();

  return (
    <div className={`mb-4 flex justify-between items-center p-4 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex items-center">
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} mr-4`}>
        PokéRapp
        </h1>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Pokemon"
          className="px-4 py-2 border rounded mr-2 bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700"
        />
        <button
          onClick={handleSearch}
          className="bg-red-500 text-white px-4 py-2 rounded block text-center"
        >
          Search
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/pokedex"
          className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} flex items-center space-x-2 mr-8`}
        >
          <span>PokeDex</span>
          {addedPokemons.length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ">{addedPokemons.length}</span>
          )}
        </Link>
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full"
        >
          {theme === 'light' ? (
            <MoonIcon className="w-6 h-6" />
          ) : (
            <SunIcon className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
