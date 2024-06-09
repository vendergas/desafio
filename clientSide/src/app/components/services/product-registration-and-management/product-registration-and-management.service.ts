import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductRegistrationAndManagementService {
  private urlApi = "";
  
  constructor(private http: HttpClient) { }

  register(product: FormGroup): Observable<FormGroup>{
    return this.http.post<FormGroup>(this.urlApi, product)
  };

  getAll(): Observable<FormGroup>{
    return this.http.get<FormGroup>(this.urlApi)
  };
}
