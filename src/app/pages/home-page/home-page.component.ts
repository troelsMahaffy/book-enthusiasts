import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { BookComponent } from '../../components/book/book.component';
import { BooksStore } from '../../book.store';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Book } from '../../book.interface';

@Component({
  selector: 'home-page',
  imports: [NgFor, NgIf, BookComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  protected readonly booksStore = inject(BooksStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  searchQuery = input<string>();
  searchSuggestions = signal<Book[]>([]);

  constructor() {
      effect(() => {
        if(this.searchQuery()) {
          this.setSearchQuery(this.searchQuery() as string);
        }
      })
  }

  getSearchQuery(): string {
    const query = this.searchQuery();
    return query ? query : '';
  }

  setSearchQuery(searchQuery: string): void {
    searchQuery ?
    this.router.navigate([ '/' ], { queryParams: { searchQuery } }) :
    this.router.navigate([ '/' ])

    const newData =
    searchQuery === ""
        ? []
        : searchQuery.length === 1
        ? this.booksStore.books().filter((item) => {
            return item.title.toLowerCase().startsWith(searchQuery.toLowerCase());
          })
        : this.booksStore.books().filter((item) => {
            return item.title.toLowerCase().includes(searchQuery.toLowerCase());
          });
          this.searchSuggestions.set(newData);
  }

  onInput(e: Event): void  {
    const searchQuery =  (e.target as HTMLInputElement).value;
    this.setSearchQuery(searchQuery);
  }

}
