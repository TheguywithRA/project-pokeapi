import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  image: string; 
}

interface PokeDexContextType {
  addedPokemons: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemonId: number) => void;
}

const PokeDexContext = createContext<PokeDexContextType | undefined>(undefined);

export const usePokeDex = () => {
  const context = useContext(PokeDexContext);
  if (!context) {
    throw new Error("usePokeDex must be used within a PokeDexProvider");
  }
  return context;
};

export const PokeDexProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [addedPokemons, setAddedPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const savedPokemons = localStorage.getItem("pokedex");
    if (savedPokemons) {
      setAddedPokemons(JSON.parse(savedPokemons));
    }
  }, []);

  const addPokemon = (pokemon: Pokemon) => {
    setAddedPokemons((prev) => {
      const newPokemons = [...prev, pokemon];
      localStorage.setItem("pokedex", JSON.stringify(newPokemons));
      return newPokemons;
    });
  };

  const removePokemon = (pokemonId: number) => {
    setAddedPokemons((prev) => {
      const newPokemons = prev.filter(pokemon => pokemon.id !== pokemonId);
      localStorage.setItem("pokedex", JSON.stringify(newPokemons));
      return newPokemons;
    });
  };

  return (
    <PokeDexContext.Provider value={{ addedPokemons, addPokemon, removePokemon }}>
      {children}
    </PokeDexContext.Provider>
  );
};
