import { Component, ElementRef, OnInit } from '@angular/core';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

import { WebSocketAPI } from './WebSocketAPI';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'retoBCP';
  faBell = faBell;
  faUser = faUser;
  words = ['abraham hackeo tu cuenta', 'camilo te mando un deposito'];
  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;
  notificationCount = 0;
  AppComponent() {}
  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(null, this);
    this.connect();

    this.notificationCount = this.words.length;

    console.log('wtf yo');
  }
  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  handleMessage(message) {
    this.greeting = JSON.parse(message);
    this.words.unshift(this.greeting.message);

    this.notificationCount += 1;
  }
  sendLoggedIn() {
    this.webSocketAPI._sendLoggedIn();
  }

  myFunction() {
    document.getElementById('myDropdown').classList.toggle('show');
  }
  hideAlert(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    var id = 'alert' + value;
    if (
      document.getElementById(id).classList.toggle('notShow').valueOf() == false
    ) {
      document.getElementById(id).classList.toggle('notShow');
    }
  }
  addWord() {
    this.words.unshift('IM IN');
  }
  onClickedOutside(e: Event) {
    if (
      document.getElementById('myDropdown').classList.toggle('show') === true
    ) {
      document.getElementById('myDropdown').classList.toggle('show');
    }
  }

  // Close the dropdown menu if the user clicks outside of it
}
