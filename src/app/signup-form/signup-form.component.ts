import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsernameValidators } from './username.validators';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'signup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  form = new FormGroup({
    account: new FormGroup({
      username: new FormControl(
        '',
        Validators.required,
        UsernameValidators.shouldBeUnique
      ),
      password: new FormControl('', Validators.required),
    }),
  });

  get username() {
    return this.form.get('account.username');
  }

  login() {
    //let isValid = authService.login(this.form.value);
    //if (!isValid) {
    this.form.setErrors({
      invalidLogin: true,
    });
    // }
  }
}
