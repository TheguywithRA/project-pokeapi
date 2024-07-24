
export interface PokemonListResponse {
  results: Array<{
    name: string;
    url: string;
  }>;
  count: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
}


export interface DetailedPokemon {
  id: number;
  name: string;
  image: string;
}
  