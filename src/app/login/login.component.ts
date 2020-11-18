import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AppComponent } from '../app.component';
import { WebSocketAPI } from '../WebSocketAPI';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  lmfao: any;
  constructor(public appComponent: AppComponent) {}

  options = { autoHide: false, scrollbarMinSize: 100 };

  greeting: any;
  deposit: number;
  withdrawal: number;
  uid: number;
  amount: number;

  ngOnInit() {
    //this.webSocketAPI = new WebSocketAPI(this.appComponent);
    //this.connect(1);
    console.log('connecting');
  }

  connect(id: number) {
    this.appComponent.disconnect();
    this.setUserId(id);
    this.appComponent.connect(false);
    //this.webSocketAPI._connect();
  }

  disconnect() {
    this.appComponent.disconnect();
    //this.webSocketAPI._disconnect();
  }

  sendWithdrawal(text: number) {
    this.appComponent.webSocketAPI._sendWithdrawal(text);
    //this.webSocketAPI._sendWithdrawal(text);
  }
  sendDeposit(text: number) {
    if (
      this.appComponent.webSocketAPI.uid ===
      this.appComponent.webSocketAPI.targetID
    ) {
      this.appComponent.webSocketAPI._sendDeposit(text);
    } else {
      this.appComponent.webSocketAPI._sendDeposit3rd(text);
    }

    //this.webSocketAPI._sendDeposit(text);
  }

  setUserId(text: number) {
    this.appComponent.webSocketAPI.uid = text;
    this.appComponent.getNotifsByUser(text);
  }
  setTargetId(text: number) {
    //this.webSocketAPI.uid = text;
    this.appComponent.webSocketAPI.targetID = text;
  }
  levels: Array<Object> = [
    { num: 0, name: 'Deposit' },
    { num: 1, name: 'Withdrawal' },
  ];
  option = 0;
  handleMessage(message) {
    this.greeting = message;
  }
  sendMessage() {
    this.appComponent.sendMessage(this.option, this.uid, this.amount);
  }
}
