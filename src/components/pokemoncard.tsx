import { Link, useLocation } from "react-router-dom";

import { DetailedPokemon } from "../types/Pokemon";
import React from "react";
import { usePokeDex } from "../context/pokedexcontext";

interface PokemonCardProps {
  pokemon: DetailedPokemon;
  isHomePage: boolean; 
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, isHomePage }) => {
  const { addPokemon, removePokemon } = usePokeDex(); 
  const location = useLocation();

  const handleRemoveClick = () => {
    removePokemon(pokemon.id); 
  };

  return (
    <div className="bg-gray-300 dark:bg-gray-800 shadow-md rounded p-4 flex flex-col items-center relative">
      <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 object-cover mb-4 rounded" />
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{pokemon.name}</h2>
      <Link
        to={`/pokemon/${pokemon.id}`}
        state={{ from: location.pathname, currentPage: location.search }}
        className="bg-red-500 text-white px-4 py-2 rounded block text-center mt-2"
      >
        View Details
      </Link>
      {isHomePage && (
        <button
          onClick={() => addPokemon(pokemon)}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded block text-center"
        >
          Add +
        </button>
      )}
      {!isHomePage && (
        <button
          onClick={handleRemoveClick}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded block text-center"
        >
          Remove -
        </button>
      )}
    </div>
  );
};

export default PokemonCard;
