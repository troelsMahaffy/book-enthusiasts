import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { BooksStore } from '../../book.store';
import { Book } from '../../book.interface';
import { ActivatedRoute } from '@angular/router';
import { BookComponent } from '../../components/book/book.component';

export const initialBook: Book = {
  id: '',
  author: '',
  title: '',
  description: '',
  longDescription: '',
  publicationDate: '' as unknown as Date,
  thumbnailImageUrl: '',
}

@Component({
  selector: 'app-book-page',
  imports: [BookComponent],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPageComponent {
  protected readonly booksStore = inject(BooksStore);
  public book: WritableSignal<Book> = signal(initialBook);

  constructor(private route: ActivatedRoute) {
    let bookId: string | null = '';

    this.route.paramMap.subscribe( paramMap => {
      bookId = paramMap.get('bookId');
      let book: Book | undefined = this.booksStore.books().find((book) => book.id === bookId);

      if(book) {
        this.book.set(book)
      }  
    })
  }
}
