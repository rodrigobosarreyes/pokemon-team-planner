import {Component, OnInit} from '@angular/core';
import {SearchInputComponent} from './search-input/search-input.component';
import {Store} from '@ngrx/store';
import {TeamActions} from '../../../core/store/team.actions';
import {PokemonPreviewComponent} from '../team-preview/pokemon-preview/pokemon-preview.component';
import {Pokemon} from '../../../core/models/pokemon';
import {PokemonActions} from './store/search.actions';
import {CommonModule} from '@angular/common';
import {selectPokemons} from './store/search.selector';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchInputComponent, PokemonPreviewComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  pokemons$ = this.store.select(selectPokemons);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(PokemonActions.loadPokemons());
  }

  onClickPokemon(pokemon: Pokemon): void {
    this.store.dispatch(TeamActions.addPokemon(pokemon));
  }

  onSearch(name: string): void {
    this.store.dispatch(PokemonActions.getPokemonsByName({name}));
  }
}
