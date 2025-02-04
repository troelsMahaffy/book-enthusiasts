import { Component, Input } from '@angular/core';
import { Book } from '../../book.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

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
  selector: 'book',
  imports: [RouterLink, RouterLinkActive, NgIf, CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  @Input() public book: Book = initialBook;
  @Input() public detailsView?: boolean;
}
