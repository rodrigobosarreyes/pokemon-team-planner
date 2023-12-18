import {createReducer, on} from '@ngrx/store';
import {Pokemon} from '../models/pokemon';
import {TeamActions} from './team.actions';
import {EntityState, createEntityAdapter} from '@ngrx/entity';

export interface TeamState extends EntityState<Pokemon> {}

export const teamAdapter = createEntityAdapter<Pokemon>();

export const initialState: TeamState = teamAdapter.getInitialState();

export const initialTeam: Array<Pokemon> = [];

export const teamReducer = createReducer(
  initialState,
  on(TeamActions.retrievedTeamList, (team) => teamAdapter.setAll(initialTeam, team)),
  on(TeamActions.addPokemon, (_state, pokemon) => teamAdapter.addOne(pokemon, _state)),
  on(TeamActions.removePokemon, (_state, pokemon) => teamAdapter.removeOne(pokemon.id, _state)),
);
