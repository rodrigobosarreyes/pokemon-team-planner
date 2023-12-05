import {Component} from '@angular/core';
import {SearchInputComponent} from './search-input/search-input.component';
import {Store} from '@ngrx/store';
import {TeamActions} from '../../../core/store/team.actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchInputComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor(private store: Store) {}

  onClickSearch(): void {
    this.store.dispatch(
      TeamActions.addPokemon({
        imageUrl: 'https://projectpokemon.org/images/normal-sprite/dodrio.gif',
        id: 78,
        name: 'Dodrio',
        types: ['normal', 'flying'],
      }),
    );
  }
}
