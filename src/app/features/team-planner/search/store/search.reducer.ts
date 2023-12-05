import {createReducer, on} from '@ngrx/store';
import {Pokemon} from '../../../../core/models/pokemon';
import {PokemonActions} from './search.actions';

export const initialState: ReadonlyArray<Pokemon> = [];

export const pokemonsReducer = createReducer<ReadonlyArray<Pokemon>>(
  initialState,
  on(
    PokemonActions.retrievedPokemonList,
    (_state, pokes: ReadonlyArray<Pokemon>): ReadonlyArray<Pokemon> => {
      return Object.entries(pokes)
        .filter((a) => a[0] !== 'type')
        .map((a) => a[1]);
    },
  ),
);