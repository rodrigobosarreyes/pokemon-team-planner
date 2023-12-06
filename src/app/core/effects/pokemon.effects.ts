import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {PokemonService} from '../../features/team-planner/services/pokemon.service';
import {PokemonActions} from '../../features/team-planner/search/store/search.actions';
import {exhaustMap, map, mergeMap} from 'rxjs';

export const loadPokemons = createEffect(
  (actions$ = inject(Actions), pokemonService = inject(PokemonService)) => {
    const acts = actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      exhaustMap(() =>
        pokemonService
          .getPokemons()
          .pipe(map((pokes) => PokemonActions.loadPokemonsSuccess({...pokes}))),
      ),
    );
    return acts;
  },
  {functional: true},
);

export const loadPokemonsByName = createEffect(
  (actions$ = inject(Actions), pokemonService = inject(PokemonService)) => {
    return actions$.pipe(
      ofType(PokemonActions.getPokemonsByName),
      mergeMap(({name, page}) =>
        pokemonService.getByName(name, page).pipe(
          map((res) =>
            PokemonActions.loadPokemonsSuccess({
              pokemons: res.pokemons,
              length: res.length,
            }),
          ),
        ),
      ),
    );
  },
  {functional: true},
);
