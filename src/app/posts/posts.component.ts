import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Post } from './post.interface';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

@Component({
  selector: 'posts',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts!: Post[];

  constructor(private service: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts(): void {
    //throw new Error('Test Error');
    this.service.getAll().subscribe({
      next: (response) => {
        this.posts = response as Post[];
      },
    });
  }

  createPost(input: HTMLInputElement): void {
    const post: Post = { title: input.value };
    input.value = '';

    this.service.create(post).subscribe({
      next: (response) => {
        post.id = response.id;
        this.posts.unshift(post);
        console.log(response);
      },
      error: (error: AppError) => {
        if (error instanceof BadInput) {
          console.log('Bad input error:', error.originalError);
        } else throw error;
      },
    });
  }

  updatePost(post: Post): void {
    this.service.update(post).subscribe({
      next: (response) => {
        console.log('Post updated successfully:', response);
      },
      error: (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('This post has already been deleted.');
        } else throw error;
      },
    });
  }

  deletePost(post: Post): void {
    this.service.delete(post.id).subscribe({
      next: (response) => {
        const index = this.posts.findIndex((p) => p.id === post.id);
        if (index !== -1) {
          this.posts.splice(index, 1);
        }
      },
      error: (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('This post has already been deleted.');
        } else throw error;
      },
    });
  }
}
