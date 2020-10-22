import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AppComponent } from '../app.component';
import { WebSocketAPI } from '../WebSocketAPI';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  appComponent:AppComponent;
  constructor( appComponentz:AppComponent) {
    this.appComponent = appComponentz;
  }

  webSocketAPI: WebSocketAPI;
  greeting: any;
  deposit: number;
  withdrawal: number;
  uid:number;
  currentID:number;

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(this.appComponent);
    this.connect(1);
    console.log('connecting');
  }

  connect(id:number) {
    
    this.appComponent.disconnect();
    this.setUserId(id);
    this.appComponent.connect();
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
    this.appComponent.webSocketAPI._sendDeposit(text);
    //this.webSocketAPI._sendDeposit(text);
  }

  setUserId(text:number){
    this.appComponent.webSocketAPI.uid = text;
    this.appComponent.getNotifsByUser(text);
  }
  setTargetId(text:number){
    //this.webSocketAPI.uid = text;
    this.appComponent.webSocketAPI.targetID = text;
  }

  handleMessage(message) {
    this.greeting = message;
  }
}
