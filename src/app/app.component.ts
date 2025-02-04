import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BooksStore } from './book.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [BooksStore],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly booksStore = inject(BooksStore);
  title = 'Book Enthusiasts';

  constructor() {
    this.booksStore.loadBooks();
  }

}
