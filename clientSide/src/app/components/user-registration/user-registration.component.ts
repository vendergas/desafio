import { Component } from '@angular/core';
import { FormBuilder, Validator } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent {
  constructor(private formBuilder: FormBuilder){}   
}
