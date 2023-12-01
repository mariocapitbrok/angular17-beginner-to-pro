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
    this.service.getAll().subscribe({
      next: (posts) => {
        this.posts = posts as Post[];
      },
    });
  }

  createPost(input: HTMLInputElement): void {
    const post: Post = { title: input.value };
    this.posts.unshift(post);

    input.value = '';

    this.service.create(post).subscribe({
      next: (newPost) => {
        post.id = newPost.id;
        console.log(newPost);
      },
      error: (error: AppError) => {
        this.posts.splice(0, 1);

        if (error instanceof BadInput) {
          console.log('Bad input error:', error.originalError);
        } else throw error;
      },
    });
  }

  updatePost(post: Post): void {
    this.service.update(post).subscribe({
      next: (updatedPost) => {
        console.log('Post updated successfully:', updatedPost);
      },
      error: (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('This post has already been deleted.');
        } else throw error;
      },
    });
  }

  deletePost(post: Post): void {
    const index = this.posts.indexOf(post);
    if (index !== -1) {
      this.posts.splice(index, 1);
    }

    this.service.delete(post.id).subscribe({
      error: (error: AppError) => {
        this.posts.splice(index, 0, post);

        if (error instanceof NotFoundError) {
          alert('This post has already been deleted.');
        } else throw error;
      },
    });
  }
}
