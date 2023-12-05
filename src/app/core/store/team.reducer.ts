import {createReducer, on} from '@ngrx/store';
import {Pokemon} from '../models/pokemon';
import {TeamActions} from './team.actions';

export const initialState: ReadonlyArray<Pokemon> = [];

export const teamReducer = createReducer<ReadonlyArray<Pokemon>>(
  initialState,
  on(TeamActions.retrievedTeamList, (team): ReadonlyArray<Pokemon> => [...team]),
  on(TeamActions.addPokemon, (_state, pokemon): ReadonlyArray<Pokemon> => {
    const idx = _state.findIndex((p) => p.id === pokemon.id);

    if (idx !== -1) {
      return _state;
    }

    if (_state.length < 6) {
      return [..._state, pokemon];
    }
    return _state;
  }),
  on(TeamActions.removePokemon, (state, pokemon): ReadonlyArray<Pokemon> => {
    const idx = state.findIndex((p) => p.id === pokemon.id);
    const newState = [...state];
    newState.splice(idx, 1);
    return newState;
  }),
);
