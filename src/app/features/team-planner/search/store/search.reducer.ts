import {createReducer, on} from '@ngrx/store';
import {Pokemon} from '../../../../core/models/pokemon';
import {PokemonActions} from './search.actions';
import {PokemonPage} from '../../../../core/models/pokemon-page';

export interface PokemonState {
  pokemons: ReadonlyArray<Pokemon>;
  page: PokemonPage;
}

export const initialState: PokemonState = {
  pokemons: [],
  page: {currentPage: 1, limit: 20, total: 0, totalPages: 1},
};

export const pokemonsReducer = createReducer<PokemonState>(
  initialState,
  on(PokemonActions.loadPokemonsSuccess, (_state, res: PokemonState): PokemonState => {
    const pokes = res.pokemons;
    const pokeList = Object.entries(pokes)
      .filter((a) => a[0] !== 'type')
      .map((a) => a[1]);
    return {page: res.page, pokemons: pokeList};
  }),
  on(PokemonActions.loadPokemonsFailure, (_state, {error}): PokemonState => {
    console.error(error);
    return _state;
  }),
  on(PokemonActions.nextPage, (_state): PokemonState => {
    const val = {
      pokemons: _state.pokemons,
      page: {
        currentPage: _state.page.currentPage + 1,
        limit: _state.page.limit,
        total: _state.page.total,
        totalPages: _state.page.totalPages,
      },
    } as PokemonState;
    return val;
  }),
);
