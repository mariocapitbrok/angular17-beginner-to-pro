import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'form-array',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.css',
})
export class FormArrayComponent {
  form = new FormGroup({
    topics: new FormArray([]),
  });

  // addTopic(topic: HTMLInputElement) {
  //   (this.form.get('topics') as FormArray).push(new FormControl(topic.value));
  // }

  get topics(): FormArray {
    return this.form.get('topics') as FormArray;
  }

  addTopic(topic: HTMLInputElement): void {
    this.topics.push(new FormControl(topic.value));
    console.log('New topic added:', topic.value);
    console.log('Current topics:', this.topics.value);
    topic.value = ''; // Clear the input field
    console.log('Input field should be cleared now', topic.value);
  }

  removeTopic(index: number) {
    this.topics.removeAt(index);
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevents the default form submission
    console.log('Form submission prevented.');
  }
}
