import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PokemonState} from './search.reducer';

export const selectPokemonsFeature = createFeatureSelector<PokemonState>('pokemons');

export const selectPokemons = createSelector(
  selectPokemonsFeature,
  (pokemons) => pokemons.pokemons,
);

export const selectPokemonsLength = createSelector(
  selectPokemonsFeature,
  (pokemons) => pokemons.length,
);
