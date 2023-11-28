import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Post } from './post.interface';
import { PostService } from '../services/post.service';

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
    this.service.getPosts().subscribe(
      (response) => {
        this.posts = response as Post[];
      },
      (error) => {
        alert('An unexpected error ocurred.');
        console.log(error);
      }
    );
  }

  createPost(input: HTMLInputElement) {
    let post: Post = { title: input.value };
    input.value = '';

    this.service.createPost(post).subscribe(
      (response) => {
        post.id = response.id;
        this.posts.splice(0, 0, post);
        console.log(response);
      },
      (error) => {
        alert('An unexpected error ocurred.');
        console.log(error);
      }
    );
  }

  updatePost(post: Post) {
    this.service.updatePost(post).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        alert('An unexpected error ocurred.');
        console.log(error);
      }
    );
  }

  deletePost(post: Post) {
    this.service.deletePost(post).subscribe(
      (response) => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      (error) => {
        alert('An unexpected error ocurred.');
        console.log(error);
      }
    );
  }
}
