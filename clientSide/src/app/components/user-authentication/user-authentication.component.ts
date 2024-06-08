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
  success: boolean = false;
  fail: boolean = false;

  constructor(private formBuilder: FormBuilder, private userAuthenticationService: UserAuthenticationService){
    this.authenticationUser = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", [Validators.min(8), Validators.required]]
    });
  }

  get formControls(){
    return this.authenticationUser.controls;
  }

  onSubmit(){
    this.userAuthenticationService
  }
}
