import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {debounceTime, filter} from 'rxjs';

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
    valor: new FormControl('', Validators.pattern(/^[a-zA-Z\s]*$/)),
  });

  ngOnInit(): void {
    this.form
      .get('valor')
      ?.valueChanges.pipe(
        filter(() => this.form.get('valor')!.valid),
        debounceTime(300),
      )
      .subscribe((v) => this.search.emit(v ?? ''));
  }

  onClickSearch(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
