import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubFollowersService } from '../services/github-followers.service';

@Component({
  selector: 'github-followers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './github-followers.component.html',
  styleUrl: './github-followers.component.css',
})
export class GithubFollowersComponent {
  followers: any[] = [];

  constructor(private service: GithubFollowersService) {}

  ngOnInit() {
    this.service
      .getAll()
      .subscribe((followers: any[]) => (this.followers = followers));
  }
}
