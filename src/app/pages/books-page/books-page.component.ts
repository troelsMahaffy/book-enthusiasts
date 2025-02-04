import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { BooksStore } from '../../book.store';
import { BookComponent } from '../../components/book/book.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'books-page',
  imports: [NgFor, BookComponent],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksPageComponent {
  protected readonly booksStore = inject(BooksStore);
}
