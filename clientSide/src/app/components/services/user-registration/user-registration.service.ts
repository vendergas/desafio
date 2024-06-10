import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  private apiUrl = "/api/user";

  constructor(private http: HttpClient){}

  register(userData: FormGroup): Observable<FormGroup>{
    return this.http.post<FormGroup>(this.apiUrl, userData);
  }
}