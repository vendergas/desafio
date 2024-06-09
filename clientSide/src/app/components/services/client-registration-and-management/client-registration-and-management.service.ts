import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientRegistrationAndManagementService {
  private urlApi = "http://localhost:3000/clienties";
  
  constructor(private http: HttpClient) { }

  register(client: any): Observable<any>{
    return this.http.post<any>(this.urlApi, client);
  };

  getAll(): Observable<any>{
    return this.http.get<any>(this.urlApi);
  };

  edit(client: any): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/${client.id}`, client);
  }

  deleteClient(id: string): Observable<any>{
    return this.http.delete(`${this.urlApi}/${id}`);
  }
}
