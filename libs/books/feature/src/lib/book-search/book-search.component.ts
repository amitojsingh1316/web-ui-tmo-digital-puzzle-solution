import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  preValue: "";
  searchForm: FormGroup;

  

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      term: ''
    });
    this.searchForm.get('term').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => {
        this.store.dispatch(searchBooks({ term }));
        return [];
      })
    ).subscribe();
  }


  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    if(this.searchTerm !== this.preValue){
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  onSearchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.onSearchBooks();
  }

  onSearchBooks() {
    const searchValue = this.searchForm.value.term;
    if (searchValue && this.preValue !== searchValue) {
       // Wait for 500ms before searching
      debounceTime(500);
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
      this.preValue = searchValue;
    } else if(this.preValue === searchValue) {
      return;
    } else {
      clearSearch();
    }
  }

  clearSearch(){
    this.store.dispatch(clearSearch());
  }
}