import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TeamState, teamAdapter} from './team.reducer';

export const selectTeamFeature = createFeatureSelector<TeamState>('team');

export const selectTeam = createSelector(selectTeamFeature, teamAdapter.getSelectors().selectAll);
