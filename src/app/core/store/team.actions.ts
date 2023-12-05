import {createActionGroup, props} from '@ngrx/store';
import {Pokemon} from '../models/pokemon';

export const TeamActions = createActionGroup({
  source: 'Team',
  events: {
    'Retrieved Team List': props<ReadonlyArray<Pokemon>>(),
    'Add Pokemon': props<Pokemon>(),
    'Remove Pokemon': props<Pokemon>(),
  },
});
