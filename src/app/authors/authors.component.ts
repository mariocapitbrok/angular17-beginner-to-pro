import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'authors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
})
export class AuthorsComponent {
  authors;

  constructor(service: AuthorsService) {
    this.authors = service.getAuthors();
  }
}
