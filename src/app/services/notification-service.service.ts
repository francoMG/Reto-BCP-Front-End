import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/Notification';
import { NotificationType } from '../models/NotificationType';
@Injectable({
  providedIn: 'root',
})
export class NotificationServiceService {
  private url: string = "https://reto-bcp.herokuapp.com/api/v1/notifications/"
  constructor(private http:HttpClient) {}

  getAllNotifications():Observable<Notification[]> {

    return this.http.get<Notification[]>(this.url);

  }
  getNotifByUserId(uid:number):Observable<Notification[]>{
    return this.http.get<Notification[]>(`${this.url}${uid}`);
  }
  
}
