import {Component, Input, Output} from '@angular/core';
import {PaginatorStore} from '../store/paginator.store';
import {AsyncPipe, JsonPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [JsonPipe, NgIf, AsyncPipe],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  providers: [PaginatorStore],
})
export class PaginatorComponent {
  @Input() set pageIndex(value: string | number) {
    this.paginatorStore.setPageIndex(value);
  }

  @Input() set length(value: string | number) {
    this.paginatorStore.setLength(value);
  }

  @Input() set pageSize(value: string | number) {
    this.paginatorStore.setPageSize(value);
  }

  @Input() set pageSizeOptions(value: readonly number[]) {
    this.paginatorStore.setPageSizeOptions(value);
  }

  @Output() readonly page = this.paginatorStore.page$;

  readonly vm$ = this.paginatorStore.vm$;

  constructor(private readonly paginatorStore: PaginatorStore) {}

  changePageSize(newPageSize: number) {
    this.paginatorStore.changePageSize(newPageSize);
  }
  nextPage() {
    this.paginatorStore.nextPage();
  }
  firstPage() {
    this.paginatorStore.firstPage();
  }
  previousPage() {
    this.paginatorStore.previousPage();
  }
  lastPage() {
    this.paginatorStore.lastPage();
  }
}
