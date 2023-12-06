import {createReducer, on} from '@ngrx/store';
import {Pokemon} from '../../../../core/models/pokemon';
import {PokemonActions} from './search.actions';

export interface PokemonState {
  pokemons: ReadonlyArray<Pokemon>;
  length: number;
}

export const initialState: PokemonState = {
  pokemons: [],
  length: 0,
};

export const pokemonsReducer = createReducer<PokemonState>(
  initialState,
  on(PokemonActions.loadPokemonsSuccess, (_state, res: PokemonState): PokemonState => {
    const pokes = res.pokemons;
    const pokeList = Object.entries(pokes)
      .filter((a) => a[0] !== 'type')
      .map((a) => a[1]);
    return {pokemons: pokeList, length: res.length};
  }),
  on(PokemonActions.loadPokemonsFailure, (_state, {error}): PokemonState => {
    console.error(error);
    return _state;
  }),
  on(PokemonActions.nextPage, (_state): PokemonState => {
    const val = {
      pokemons: _state.pokemons,
    } as PokemonState;
    return val;
  }),
);
