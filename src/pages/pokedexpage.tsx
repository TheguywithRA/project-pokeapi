import PokemonCard from '../components/pokemoncard';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokeDex } from '../context/pokedexcontext';

const PokeDexPage: React.FC = () => {
  const { addedPokemons } = usePokeDex();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">PokeDex</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
        {addedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} isHomePage={false} />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleBackClick}
          className="bg-red-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-red-500 transition-colors mt-20"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PokeDexPage;
