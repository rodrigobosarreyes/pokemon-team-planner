export interface PaginatorState {
  pageIndex: number;
  pageSize: number;
  length: number;
  pageSizeOptions: ReadonlySet<number>;
}

export interface PageEvent extends Pick<PaginatorState, 'pageIndex' | 'pageSize' | 'length'> {
  previousPageIndex?: number;
}
