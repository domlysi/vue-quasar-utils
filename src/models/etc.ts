export interface CustomPagination {
  count: number,
  page_size: number,
  pages: number,
  next?: string,
  previous?: string,
  results: Array<never>
}
