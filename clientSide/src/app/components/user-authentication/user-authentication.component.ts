import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticationService } from '../services/user-authentication/user-authentication.service';

@Component({
  selector: 'app-user-authentication',
  standalone: true,
  imports: [],
  templateUrl: './user-authentication.component.html',
  styleUrl: './user-authentication.component.scss'
})
export class UserAuthenticationComponent {
  authenticationUser: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  fail: boolean = false;

  constructor(private formBuilder: FormBuilder, private userAuthenticationService: UserAuthenticationService){
    this.authenticationUser = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get formControls(){
    return this.authenticationUser.controls;
  }

  onSubmit(){
    const {email, password} = this.authenticationUser.value;
    this.submitted = true;

    this.userAuthenticationService.login(email, password).subscribe({
      next: response => {
        console.log(`Response: ${response}`);
        this.success = true;
        this.fail = false;
      },

      error: error => {
        console.log(`Error: ${error}`);
        this.success = false;
        this.fail = true;
      }
    })
  }
}
