import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Pokemon} from '../../../../core/models/pokemon';

export const PokemonActions = createActionGroup({
  source: 'Pokemons',
  events: {
    'Load Pokemons': emptyProps,
    'Get Pokemons By Name': props<{name: string}>(),
    'Load Pokemons Success': props<ReadonlyArray<Pokemon>>(),
    'Load Pokemons Failure': props<{error: string}>(),
  },
});
