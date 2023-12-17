import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {PaginatorState} from '../models/pagination';
import {filter, map, pairwise, skip, tap, withLatestFrom} from 'rxjs';

@Injectable()
export class PaginatorStore extends ComponentStore<PaginatorState> {
  constructor() {
    super({
      length: 0,
      pageIndex: 1,
      pageSize: 20,
      pageSizeOptions: new Set<number>([20]),
    });
  }

  readonly setPageIndex = this.updater(
    (state, value: string | number): PaginatorState => ({
      ...state,
      pageIndex: Number(value) || 1,
    }),
  );

  readonly setPageSize = this.updater(
    (state, value: string | number): PaginatorState => ({
      ...state,
      pageSize: Number(value) || 0,
    }),
  );

  readonly setLength = this.updater(
    (state, value: string | number): PaginatorState => ({
      ...state,
      length: Number(value) || 0,
    }),
  );

  readonly setPageSizeOptions = this.updater((state, value: readonly number[]): PaginatorState => {
    const pageSizeOptions = new Set<number>([...value, state.pageSize].sort((a, b) => a - b));
    return {...state, pageSizeOptions};
  });

  readonly changePageSize = this.updater((state, newPageSize: number): PaginatorState => {
    const startIndex = state.pageIndex * state.pageSize;
    return {
      ...state,
      pageSize: newPageSize,
      pageIndex: Math.floor(startIndex / newPageSize),
    };
  });

  readonly hasPreviousPage$ = this.select(
    ({pageIndex, pageSize}) => pageIndex >= 2 && pageSize != 0,
  );

  readonly numberOfPages$ = this.select(({pageSize, length}) => {
    if (!pageSize) return 0;
    return Math.ceil(length / pageSize);
  });

  readonly hasNextPage$ = this.select(
    this.state$,
    this.numberOfPages$,
    ({pageIndex, pageSize}, numberOfPages) => {
      const maxPageIndex = numberOfPages;
      return pageIndex < maxPageIndex && pageSize != 0;
    },
  );

  readonly rangeLabel$ = this.select(({pageIndex, pageSize, length}) => {
    if (length === 0 || pageSize === 0) return `0 of ${length}`;

    length = Math.max(length, 0);
    const startIndex = pageIndex * pageSize - pageSize;

    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} of ${length}`;
  });

  readonly vm$ = this.select(
    this.state$,
    this.hasPreviousPage$,
    this.hasNextPage$,
    this.rangeLabel$,
    this.numberOfPages$,
    (state, hasPreviousPage, hasNextPage, rangeLabel, numberOfPages) => ({
      pageSize: state.pageSize,
      pageSizeOptions: Array.from(state.pageSizeOptions),
      pageIndex: state.pageIndex,
      hasPreviousPage,
      hasNextPage,
      rangeLabel,
      numberOfPages,
    }),
  );

  private readonly pageIndexChanges$ = this.state$.pipe(
    map((state) => state.pageIndex),
    pairwise(),
  );

  readonly page$ = this.select(
    this.pageIndexChanges$,
    this.select((state) => [state.pageSize, state.length]),
    ([previousPageIndex, pageIndex], [pageSize, length]) => ({
      pageIndex,
      previousPageIndex,
      pageSize,
      length,
    }),
    {debounce: true},
  ).pipe(skip(1));

  readonly nextPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasNextPage$),
      filter(([, hasNextPage]) => hasNextPage),
      tap(() => {
        this.setPageIndex(this.get().pageIndex + 1);
      }),
    );
  });

  readonly firstPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasPreviousPage$),
      filter(([, hasPreviousPage]) => hasPreviousPage),
      tap(() => {
        this.setPageIndex(0);
      }),
    );
  });

  readonly previousPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasPreviousPage$),
      filter(([, hasPreviousPage]) => hasPreviousPage),
      tap(() => {
        this.setPageIndex(this.get().pageIndex - 1);
      }),
    );
  });

  readonly lastPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasNextPage$, this.numberOfPages$),
      filter(([, hasNextPage]) => hasNextPage),
      tap(([, , numberOfPages]) => {
        this.setPageIndex(numberOfPages);
      }),
    );
  });
}
