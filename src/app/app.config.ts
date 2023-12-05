import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {teamReducer} from './core/store/team.reducer';
import {provideHttpClient} from '@angular/common/http';
import {graphqlProvider} from './graphql.provider';
import {pokemonsReducer} from './features/team-planner/search/store/search.reducer';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideEffects} from '@ngrx/effects';
import * as pokemonEffects from './core/effects/pokemon.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({team: teamReducer, pokemons: pokemonsReducer}),
    provideEffects(pokemonEffects),
    provideHttpClient(),
    graphqlProvider,
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
};
