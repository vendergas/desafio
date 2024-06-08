import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  private apiUrl = "";

  constructor(private http: HttpClient){}

  register(userData: FormBuilder): Observable<FormBuilder>{
    return this.http.post<FormBuilder>(this.apiUrl, userData);
  }
}