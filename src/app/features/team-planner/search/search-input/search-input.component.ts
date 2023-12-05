import {Component, EventEmitter, Output} from '@angular/core';
import {Pokemon} from '../../../../core/models/pokemon';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  @Output() readonly search = new EventEmitter<Pokemon | null>();

  onClickSearch(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    console.log(event);
    this.search.emit({
      imageUrl: 'https://projectpokemon.org/images/normal-sprite/dodrio.gif',
      id: 78,
      name: 'Dodrio',
      types: ['normal', 'flying'],
    });
  }
}
