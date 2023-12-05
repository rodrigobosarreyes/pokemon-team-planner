import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  @Output() readonly search = new EventEmitter<string>();

  value = '';

  onClickSearch(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    this.search.emit(this.value);
  }
}
