import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private urlApi = "http://localhost:3000/api/orders"
  constructor(private http: HttpClient){}

  getAll(): Observable<any>{
    return this.http.get<any>(this.urlApi);
  }

  generateOrder(order: any): Observable<any>{
    return this.http.post<any>(this.urlApi, order);
  }

  deleteOrder(id: string): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/${id}`);
  }
}
