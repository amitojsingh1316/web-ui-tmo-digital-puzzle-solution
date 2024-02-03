import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  undoAddToReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  preValue: "";

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

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
    
    const snackBarRef = this.snackbar.open(
      `${book.title} added to your reading list!`,
      'Undo',
      { duration: 5000 }
    );

    snackBarRef
      .onAction()
      .pipe(take(1))
      .subscribe(() => this.store.dispatch(undoAddToReadingList({ book })));

  }

  onSearchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.onSearchBooks();
  }

  onSearchBooks() {
    const searchValue = this.searchForm.value.term;
    if (searchValue && this.preValue !== searchValue) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
      this.preValue = searchValue;
    } else if(this.preValue === searchValue) {
      return false;
    } else {
      clearSearch();
    }
  }

  clearSearch(){
    this.store.dispatch(clearSearch());
  }
}