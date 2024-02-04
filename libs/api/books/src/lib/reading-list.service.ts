import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update(list => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        added: true,
        ...rest
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update(list => {
      return list.filter(x => x.bookId !== id);
    });
  }

  async updatetoFinishedBook(id: string): Promise<void> {
    this.storage.update(list => {
      const bookToUpdate = list.filter(x => x.bookId === id)[0];
      const { bookId, finished, ...rest } = bookToUpdate;

      if (!finished) {
        const payload = {
          bookId: bookId,
          finished: true,
          finishedDate: new Date().toISOString(),
          ...rest
        }

        const index = list.findIndex((book) => book.bookId === payload.bookId);
        if (index !== -1) {
          list[index] = payload;
        }
      }

      return list;
    });

  }
}
