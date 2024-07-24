import axios, { AxiosResponse } from 'axios';

import { PokemonDetail } from '../types/Pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemonDetail = async (id: string): Promise<PokemonDetail> => {
  try {
    const response: AxiosResponse<PokemonDetail> = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon details', error);
    throw error; 
  }
};
