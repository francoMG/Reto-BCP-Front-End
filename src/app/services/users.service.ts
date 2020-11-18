import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = 'https://users-retobcp.herokuapp.com/users/';
  constructor(private http: HttpClient) {}

  login(body): Observable<any> {
    return this.http.post<any>(`${this.url}reto`, body);
  }

  logout(body): Observable<any> {
    return this.http.post<any>(`${this.url}logout`, body);
  }
}
