import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationType } from '../models/NotificationType';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private url: string = "https://user-subscriptions.herokuapp.com/user-subscriptions/"
  constructor(private http:HttpClient) { }

  getByUser(id:number):Observable<any>{
    return this.http.get<any>(`${this.url}${id}`);
  }

  
  deletePreference(type):Observable<any>{
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: type
};

    return this.http.delete<any>(this.url,httpOptions);
  }

  postPreference(sub):Observable<any>{
    return this.http.post<any>(this.url,sub);
  }
}
