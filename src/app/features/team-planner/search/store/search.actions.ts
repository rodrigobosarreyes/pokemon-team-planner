import {createActionGroup, props} from '@ngrx/store';
import {Pokemon} from '../../../../core/models/pokemon';

export const PokemonActions = createActionGroup({
  source: 'Pokemons',
  events: {
    'Retrieved Pokemon List': props<ReadonlyArray<Pokemon>>(),
  },
});
