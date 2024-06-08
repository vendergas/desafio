import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { UserRegistrationService } from '../services/use-registration/user-registration.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent {
  creatUser: FormGroup;
  constructor(private formBuilder: FormBuilder, private userRegistrationService: UserRegistrationService){
    this.creatUser = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.min(8), Validators.required]]
    });
  }
  
  
}