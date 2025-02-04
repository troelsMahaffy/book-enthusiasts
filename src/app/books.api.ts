import { Injectable } from "@angular/core";
import { BooksFixture } from "./books.fixture";
import { Book } from "./book.interface";


@Injectable({
    providedIn: 'root',
  })
  export class BooksApiService {
    public async booksMockApiPromise(): Promise<Book[]> {
        const booksPromise: Promise<Book[]> = Promise.resolve(BooksFixture);
        try {
            const res =
            await booksPromise
            .then(response => response);
            return res
        } catch (err) {
            console.log('No books today!')
        }
        return Promise.resolve([]);


    }
}
