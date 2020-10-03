import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { WebSocketAPI } from '../WebSocketAPI';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}
  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: number;
  withdrawal: number;
  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new LoginComponent(), null);
    this.connect();
    console.log('connecting');
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendWithdrawal(text: number) {
    this.webSocketAPI._sendWithdrawal(text);
  }
  sendDeposit(text: number) {
    this.webSocketAPI._sendDeposit(text);
  }

  handleMessage(message) {
    this.greeting = message;
  }
}
