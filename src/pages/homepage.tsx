import React, { useEffect, useState } from 'react';
import { fetchPokemonDetail, fetchPokemonList } from '../service/api';

import { DetailedPokemon } from '../types/Pokemon';
import NavBar from '../components/navbar';
import Pagination from '../components/pagination';
import PokemonCard from '../components/pokemoncard';
import { useTheme } from '../context/themecontext';

const HomePage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [pokemonList, setPokemonList] = useState<DetailedPokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      const limit = 20;
      const offset = (currentPage - 1) * limit;

      try {
        const response = await fetchPokemonList(limit, offset);
        const fetchDetails = response.results.map(async (pokemon) => {
          const pokemonDetail = await fetchPokemonDetail(pokemon.name);
          return {
            id: pokemonDetail.id,
            name: pokemonDetail.name,
            image: pokemonDetail.sprites.front_default,
          };
        });

        const detailedPokemonList = await Promise.all(fetchDetails);
        setPokemonList(detailedPokemonList);
        setTotalPages(Math.ceil(response.count / limit));
      } catch (error) {
        console.error('Error fetching Pokémon data', error);
      }
    };

    fetchPokemon();
  }, [currentPage]);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    try {
      const pokemonDetail = await fetchPokemonDetail(searchQuery.toLowerCase());
      setPokemonList([{
        id: pokemonDetail.id,
        name: pokemonDetail.name,
        image: pokemonDetail.sprites.front_default,
      }]);
      setTotalPages(1);
      setCurrentPage(1);
    } catch (error) {
      console.error('Pokemon not found or an error occurred', error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`p-4 ${theme === 'dark' ? 'dark' : ''} bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen`}>
      <NavBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        handleSearch={handleSearch} 
        toggleTheme={toggleTheme} 
        theme={theme}
      />
      <div className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8 capitalize">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} isHomePage={true} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default HomePage;
