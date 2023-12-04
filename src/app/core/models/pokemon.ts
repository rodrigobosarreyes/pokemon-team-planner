export type PokemonType =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow';

export interface Pokemon {
  imageUrl: string;
  id: number;
  name: string;
  types: PokemonType[];
  description?: string;
  height?: number;
  weight?: number;
  category?: string;
  ability?: string;
  weakness?: PokemonType[];
}
