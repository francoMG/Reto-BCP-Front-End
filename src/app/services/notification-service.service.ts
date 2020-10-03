import { Injectable } from '@angular/core';
import { Notification } from '../models/Notification';
import { NotificationType } from '../models/NotificationType';
@Injectable({
  providedIn: 'root',
})
export class NotificationServiceService {
  constructor() {}

  getNotifications(): Notification[] {
    console.log();
  }
}
