import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductRegistrationAndManagementService {
  private urlApi = "http://localhost:3000/products";
  
  constructor(private http: HttpClient) { }

  register(product: any): Observable<any>{
    return this.http.post<any>(this.urlApi, product);
  };

  getAll(): Observable<any>{
    return this.http.get<any>(this.urlApi);
  };

  edit(product: any): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<any>{
    return this.http.delete(`${this.urlApi}/${id}`);
  }
}
