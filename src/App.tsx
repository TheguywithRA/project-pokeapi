import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import HomePage from './pages/homepage';
import PokeDexPage from './pages/pokedexpage';
import { PokeDexProvider } from './context/pokedexcontext';
import PokemonDetailPage from './pages/pokemondetailpage';
import React from 'react';

const App: React.FC = () => {
  return (
    <PokeDexProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokedex" element={<PokeDexPage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
        </Routes>
      </Router>
    </PokeDexProvider>
  );
};

export default App;
