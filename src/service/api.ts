import { PokemonDetail, PokemonListResponse } from '../types/Pokemon';

import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemonList = async (limit: number, offset: number): Promise<PokemonListResponse> => {
  const response = await axios.get<PokemonListResponse>(`${API_BASE_URL}?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const fetchPokemonDetail = async (nameOrId: string): Promise<PokemonDetail> => {
  const response = await axios.get<PokemonDetail>(`${API_BASE_URL}/${nameOrId}`);
  return response.data;
};
