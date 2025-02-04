import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
        import('./pages/home-page/home-page.component').then(
            (c) => c.HomePageComponent,
        ),
    },
    {
        path: 'books',
        loadComponent: () =>
        import('./pages/books-page/books-page.component').then(
            (c) => c.BooksPageComponent,
        ),
    },
    {
        path: 'book/:bookId',
        loadComponent: () =>
        import('./pages/book-page/book-page.component').then(
            (c) => c.BookPageComponent,
        ),
    }
];
