import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {teamReducer} from './core/store/team.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({team: teamReducer})],
};
