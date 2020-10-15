import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../app.component';
import { WebSocketAPI } from '../WebSocketAPI';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private appComponent:AppComponent) {}
  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: number;
  withdrawal: number;
  uid:number;

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(this, null);
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
  setUserId(text:number){
    this.webSocketAPI.uid = text;
    this.appComponent.getNotifsByUser(text);
  }

  handleMessage(message) {
    this.greeting = message;
  }
}
