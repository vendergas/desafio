import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  private apiUrl = ""

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<object>{
    return this.http.post(this.apiUrl, {email, password});
  }
}
