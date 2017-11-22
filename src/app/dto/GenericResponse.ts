export class GenericResponse<T>{
  private _content:T[];
  private _last: boolean;
  private _totalElements: number;
  private _totalPages:number;
  private _size:number;
  private _number:number;
  private _sort: string;
  private _first: boolean;
  private _numberOfElements: number;


  get content(): T[] {
    return this._content;
  }

  set content(value: T[]) {
    this._content = value;
  }

  get last(): boolean {
    return this._last;
  }

  set last(value: boolean) {
    this._last = value;
  }

  get totalElements(): number {
    return this._totalElements;
  }

  set totalElements(value: number) {
    this._totalElements = value;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  set totalPages(value: number) {
    this._totalPages = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get number(): number {
    return this._number;
  }

  set number(value: number) {
    this._number = value;
  }

  get sort(): string {
    return this._sort;
  }

  set sort(value: string) {
    this._sort = value;
  }

  get first(): boolean {
    return this._first;
  }

  set first(value: boolean) {
    this._first = value;
  }

  get numberOfElements(): number {
    return this._numberOfElements;
  }

  set numberOfElements(value: number) {
    this._numberOfElements = value;
  }
}
