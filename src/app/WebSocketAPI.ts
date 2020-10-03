import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { NotificationType } from './models/NotificationType';
import { Notification } from './models/Notification';
export class WebSocketAPI {
  webSocketEndPoint: string = 'http://localhost:8080/ws';
  topic: string = '/topic/greetings';
  stompClient: any;
  loginComponent: LoginComponent;
  appComponent: AppComponent;

  constructor(loginComponent: LoginComponent, appComponent: AppComponent) {
    this.loginComponent = loginComponent;
    this.appComponent = appComponent;
  }
  _connect() {
    console.log('Initialize WebSocket Connection');
    let ws = new SockJS(this.webSocketEndPoint);

    this.stompClient = Stomp.over(ws);

    const _this = this;

    _this.stompClient.connect(
      {},
      function (frame) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
          _this.onMessageReceived(sdkEvent);
        });

        _this._sendLoggedIn();

        //_this.stompClient.reconnect_delay = 2000;
      },
      this.errorCallBack
    );
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _sendWithdrawal(message) {
    console.log('calling logout api via web socket');
    let notif = new Notification();
    notif.amount = message;
    notif.deleted = false;
    notif.readNotif = false;
    notif.title = 'title';
    notif.user_id = 1;
    notif.notificationType = new NotificationType();
    notif.notificationType.id = 1;

    this.stompClient.send('/app/hello', {}, JSON.stringify(notif));
  }
  _sendDeposit(message) {
    console.log('calling logout api via web socket');
    let notif = new Notification();

    notif.amount = message;
    notif.deleted = false;
    notif.readNotif = false;
    notif.title = 'title';
    notif.user_id = 1;
    notif.notificationType = new NotificationType();
    notif.notificationType.id = 2;

    this.stompClient.send('/app/hello', {}, JSON.stringify(notif));
  }
  _sendLoggedIn() {
    if (this.appComponent != null) {
      console.log('calling logout api via web socket');
      let notif = new Notification();

      notif.amount = -1;
      notif.deleted = false;
      notif.readNotif = false;
      notif.title = 'title';
      notif.user_id = 1;
      notif.notificationType = new NotificationType();
      notif.notificationType.id = 3;

      this.stompClient.send('/app/hello', {}, JSON.stringify(notif));
    }
  }

  onMessageReceived(message) {
    console.log('Message Recieved from Server :: ' + message);
    if (this.loginComponent != null) {
      //this.loginComponent.handleMessage(JSON.stringify(message.body));
    }
    if (this.appComponent != null) {
      this.appComponent.handleMessage(message.body);
    }
  }
}
