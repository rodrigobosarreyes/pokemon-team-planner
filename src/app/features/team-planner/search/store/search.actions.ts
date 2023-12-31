import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {PokemonState} from './search.reducer';
import {PageEvent} from '../../../../core/models/pagination';

export const PokemonActions = createActionGroup({
  source: 'Pokemons',
  events: {
    'Load Pokemons': emptyProps,
    'Get Pokemons By Name': props<{name: string; page: PageEvent}>(),
    'Load Pokemons Success': props<PokemonState>(),
    'Load Pokemons Failure': props<{error: string}>(),
    'Next Page': emptyProps,
    'Load Next Page': props<{name: string}>,
  },
});
