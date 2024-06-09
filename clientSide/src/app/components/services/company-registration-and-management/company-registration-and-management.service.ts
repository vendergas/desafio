import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyRegistrationAndManagementService {
  private urlApi = "http://localhost:3000/companies";
  
  constructor(private http: HttpClient) { }

  register(company: any): Observable<any>{
    return this.http.post<any>(this.urlApi, company);
  };

  getAll(): Observable<any>{
    return this.http.get<any>(this.urlApi);
  };

  edit(company: any): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/${company.id}`, company);
  }

  deleteCompany(id: string): Observable<any>{
    return this.http.delete(`${this.urlApi}/${id}`);
  }
}
