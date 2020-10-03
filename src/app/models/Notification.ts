import { NotificationType } from './NotificationType';
export class Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  createdAt: Date;
  notificationType: NotificationType;
  readNotif: boolean;
  amount: number;
  deleted: boolean;
}
