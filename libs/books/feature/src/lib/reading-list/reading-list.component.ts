import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToFinishedList, getReadingList, removeFromReadingList,  } from '@tmo/books/data-access';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  // booksToRead$ = this.readingList$.pipe(
  // );
  finishedList$ = this.readingList$.pipe(
    map(readingList => readingList.filter(book => book.finished===true))
  );

  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  addingIntoFinishedList(item){
    this.store.dispatch(addToFinishedList({ item }));
  }
}
