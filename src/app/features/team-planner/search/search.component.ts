import {Component, OnInit} from '@angular/core';
import {SearchInputComponent} from './search-input/search-input.component';
import {Store} from '@ngrx/store';
import {TeamActions} from '../../../core/store/team.actions';
import {PokemonService} from '../services/pokemon.service';
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

  team: Array<Pokemon> = [
    {
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/primarina.gif',
      id: 1,
      name: 'Primarina',
      types: ['water', 'fairy'],
    },
    {
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/rapidash.gif',
      id: 78,
      name: 'Rapidash',
      types: ['fire'],
    },
    {
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/dragapult.gif',
      id: 78,
      name: 'Dragapult',
      types: ['dragon', 'ghost'],
    },
    {
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/cresselia.gif',
      id: 78,
      name: 'Cresselia',
      types: ['psychic'],
    },
    {
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/lucario.gif',
      id: 78,
      name: 'Lucario',
      types: ['fighting', 'steel'],
    },
    {
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/dodrio.gif',
      id: 78,
      name: 'Dodrio',
      types: ['normal', 'flying'],
    },
  ];

  constructor(
    private store: Store,
    private pokemonService: PokemonService,
  ) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((a: Array<Pokemon>) => {
      this.store.dispatch(PokemonActions.retrievedPokemonList(a));
    });
  }

  onClickPokemon(pokemon: Pokemon): void {
    this.store.dispatch(TeamActions.addPokemon(pokemon));
  }

  onSearch(name: string): void {
    this.pokemonService
      .getByName(name)
      .subscribe((a) => this.store.dispatch(PokemonActions.retrievedPokemonList(a)));
  }
}
