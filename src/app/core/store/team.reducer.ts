import {createReducer, on} from '@ngrx/store';
import {Pokemon} from '../models/pokemon';
import {TeamActions} from './team.actions';

export const initialState: ReadonlyArray<Pokemon> = [];

export const teamReducer = createReducer<ReadonlyArray<Pokemon>>(
  initialState,
  on(TeamActions.retrievedTeamList, (team): ReadonlyArray<Pokemon> => [...team]),
  on(TeamActions.addPokemon, (_state, pokemon): ReadonlyArray<Pokemon> => {
    if (_state.length < 6) {
      return [..._state, pokemon];
    }
    return [..._state];
  }),
);
