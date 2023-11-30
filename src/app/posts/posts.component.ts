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
    this.service.getPosts().subscribe({
      next: (response) => {
        this.posts = response as Post[];
      },
      error: (error: AppError) => {
        alert('An unexpected error occurred while fetching posts.');
        console.log(error);
      },
    });
  }

  createPost(input: HTMLInputElement): void {
    const post: Post = { title: input.value };
    input.value = '';

    this.service.createPost(post).subscribe({
      next: (response) => {
        post.id = response.id;
        this.posts.unshift(post); // Use unshift to add the new post at the beginning of the array.
        console.log(response);
      },
      error: (error: AppError) => {
        if (error instanceof BadInput) {
          // Handle BadInput error if needed.
          console.log('Bad input error:', error.originalError);
        } else {
          alert('An unexpected error occurred while creating a post.');
          console.log(error);
        }
      },
    });
  }

  updatePost(post: Post): void {
    this.service.updatePost(post).subscribe({
      next: (response) => {
        // Handle the successful update if needed.
        console.log('Post updated successfully:', response);
      },
      error: (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('This post has already been deleted.');
        } else {
          alert('An unexpected error occurred while updating the post.');
          console.log(error);
        }
      },
    });
  }

  deletePost(post: Post): void {
    this.service.deletePost(post.id).subscribe({
      next: (response) => {
        const index = this.posts.findIndex((p) => p.id === post.id);
        if (index !== -1) {
          this.posts.splice(index, 1);
        }
      },
      error: (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('This post has already been deleted.');
        } else {
          alert('An unexpected error occurred while deleting the post.');
          console.log(error);
        }
      },
    });
  }
}
