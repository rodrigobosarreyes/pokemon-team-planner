import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {PokemonService} from '../../features/team-planner/services/pokemon.service';
import {PokemonActions} from '../../features/team-planner/search/store/search.actions';
import {exhaustMap, map, mergeMap, withLatestFrom} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectPage} from '../../features/team-planner/search/store/search.selector';

export const loadPokemons = createEffect(
  (actions$ = inject(Actions), pokemonService = inject(PokemonService)) => {
    const acts = actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      exhaustMap(() =>
        pokemonService
          .getPokemons()
          .pipe(
            map((pokes) =>
              PokemonActions.loadPokemonsSuccess({page: pokes.page, pokemons: pokes.pokemons}),
            ),
          ),
      ),
    );
    return acts;
  },
  {functional: true},
);

export const loadPokemonsByName = createEffect(
  (actions$ = inject(Actions), pokemonService = inject(PokemonService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(PokemonActions.getPokemonsByName),
      concatLatestFrom(() => store.select(selectPage)),
      mergeMap(([{name}, page]) =>
        pokemonService.getByName(name, page).pipe(
          map((res) =>
            PokemonActions.loadPokemonsSuccess({
              page: res.page,
              pokemons: res.pokemons,
            }),
          ),
        ),
      ),
    );
  },
  {functional: true},
);

// export const loadNextPage = createEffect(
//   (actions$ = inject(Actions), pokemonService = inject(PokemonService), store = inject(Store)) => {
//     return actions$.pipe(
//       ofType(PokemonActions.loadNextPage),
//       withLatestFrom(store.select(selectPage)),
//       map(([, state]) => state),
//       tap(({currentPage}) => ),
//     );
//   },
//   {functional: true},
// );
