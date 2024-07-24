import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { PokemonDetail } from "../types/Pokemon";
import StatBar from "../components/statbar";
import { fetchPokemonDetail } from "../service/pokemonservice";

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { from, currentPage } = location.state || {};
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPokemonDetail = async () => {
      if (id) {
        try {
          const pokemonDetail = await fetchPokemonDetail(id);
          setPokemon(pokemonDetail);
        } catch (error) {
          console.error("Error fetching Pokémon details", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No Pokémon ID provided");
        setLoading(false);
      }
    };

    getPokemonDetail();
  }, [id]);

  const handleBackClick = () => {
    if (from) {
      navigate(`${from}?page=${currentPage}`);
    } else {
      navigate("/");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-700"></div>
        <div className="text-white">Loading.....</div>
      </div>
    );
  if (!pokemon) return <p>Pokemon not found.</p>;

  return (
    <div className="p-4">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-4">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-40 h-40 object-cover mx-auto mt-4 animate-bounce"
        />
        <div className="p-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
            {pokemon.name}
          </h1>
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Stats
            </h2>
            <div className="mt-2">
              {pokemon.stats.map((stat) => (
                <StatBar
                  key={stat.stat.name}
                  statName={stat.stat.name}
                  statValue={stat.base_stat}
                />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Types
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {pokemon.types.map((typeInfo) => (
                <span
                  key={typeInfo.type.name}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full capitalize"
                >
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
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

export default PokemonDetailPage;
