import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Pokemon} from '../models/pokemon';

export const selectTeamFeature = createFeatureSelector<ReadonlyArray<Pokemon>>('team');

export const selectTeam = createSelector(selectTeamFeature, (team) => team);
