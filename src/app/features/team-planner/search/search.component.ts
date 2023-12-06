import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchInputComponent} from './search-input/search-input.component';
import {Store} from '@ngrx/store';
import {TeamActions} from '../../../core/store/team.actions';
import {PokemonPreviewComponent} from '../team-preview/pokemon-preview/pokemon-preview.component';
import {Pokemon} from '../../../core/models/pokemon';
import {PokemonActions} from './store/search.actions';
import {CommonModule} from '@angular/common';
import {selectPokemons, selectPokemonsLength} from './store/search.selector';
import {PaginatorComponent} from '../../../core/paginator/paginator.component';
import {PageEvent} from '../../../core/models/pagination';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchInputComponent, PokemonPreviewComponent, CommonModule, PaginatorComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  @ViewChild(PaginatorComponent) paginatorComponent!: PaginatorComponent;
  pokemons$ = this.store.select(selectPokemons);
  pokemonsLength$ = this.store.select(selectPokemonsLength);
  page: PageEvent = {} as PageEvent;

  value = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(PokemonActions.loadPokemons());
  }

  onClickPokemon(pokemon: Pokemon): void {
    this.store.dispatch(TeamActions.addPokemon(pokemon));
  }

  onSearch(name: string): void {
    this.value = name;
    this.paginatorComponent.firstPage();
    // this.store.dispatch(PokemonActions.getPokemonsByName({name, page: this.page}));
  }

  onChangePage(event: PageEvent) {
    this.page = event;
    this.store.dispatch(PokemonActions.getPokemonsByName({name: this.value, page: event}));
  }
}
