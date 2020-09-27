import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  async get(url: string): Promise<any> {
    return await this.http.get(`${environment.url}/${url}`).toPromise();
  }

  async post(url: string, body: any): Promise<any> {
    return await this.http.post(`${environment.url}/${url}`, body).toPromise();
  }

  async put(url: string, body: any): Promise<any> {
    return await this.http.put(`${environment.url}/${url}`, body).toPromise();
  }

  async delete(url: string): Promise<any> {
    return await this.http.delete(`${environment.url}/${url}`).toPromise();
  }
}
