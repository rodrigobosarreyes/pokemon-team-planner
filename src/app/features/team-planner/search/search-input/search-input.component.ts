import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent implements OnInit {
  @Output() readonly search = new EventEmitter<string>();

  form: FormGroup = new FormGroup({
    valor: new FormControl(''),
  });

  ngOnInit(): void {
    this.form
      .get('valor')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((v) => this.search.emit(v ?? ''));
  }

  onClickSearch(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
