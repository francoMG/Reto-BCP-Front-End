import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationType } from '../models/NotificationType';

@Injectable({
  providedIn: 'root'
})
export class NotificationTypesService {

  private url: string = "https://reto-bcp.herokuapp.com/api/v1/notificationTypes"
  constructor(private http:HttpClient) { }

  getNotificationTypes():Observable<NotificationType[]>{
    return this.http.get<NotificationType[]>(this.url);
  }
}
