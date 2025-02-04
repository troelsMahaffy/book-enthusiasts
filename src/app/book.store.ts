import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Book } from './book.interface';
import { computed, inject } from '@angular/core';
import { BooksApiService } from './books.api';

type BooksState = {
  books: Book[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
  error?: Error;
};

const initialState: BooksState = {
  books: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
  error: undefined,
};

export const BooksStore = signalStore(
  withState(initialState),
  withComputed(({ books, filter }) => ({
    sortedBooks: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return books().toSorted((a, b) =>
       {
        return direction *
        new Date(b.publicationDate).getTime() -
        new Date(a.publicationDate).getTime()}
      ).slice(0, 3);
    }),
  })),
  withMethods((store, booksApiService = inject(BooksApiService)) => ({
    async loadBooks() {
        booksApiService.booksMockApiPromise()
        .then((response) => patchState(store, { books: response  }))
        .catch((error) => patchState(store, { error }));
      }
    })
  ),
);