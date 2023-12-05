import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Pokemon} from '../../../../core/models/pokemon';

export const selectPokemonsFeature = createFeatureSelector<ReadonlyArray<Pokemon>>('pokemons');

export const selectPokemons = createSelector(selectPokemonsFeature, (pokemons) => pokemons);
