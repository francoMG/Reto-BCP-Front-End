import { Component, ElementRef, OnInit } from '@angular/core';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

import { NotificationServiceService } from './services/notification-service.service';

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
  public webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;
  notificationCount = 0;
  public notifications = []
  public notificationService : NotificationServiceService;

  constructor(private notificationServicex : NotificationServiceService) {
    this.notificationService = notificationServicex;
    
  }

  ngOnInit() {

    this.notificationService.getNotifByUserId(1).subscribe((data)=> 
    { this.notifications = data;
      this.notificationCount = this.notifications.length;
      this.notifications.forEach(notif => this.words.unshift(notif.message));
    }
    , error => console.log(error));
    //makes api object for this component 
    this.webSocketAPI = new WebSocketAPI(this);
    //establishes connection with websocket API
    this.connect();
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }
  getNotifsByUser(uid:number){
    console.log("TRINBG")
    this.notificationService.getNotifByUserId(uid).subscribe((data)=> 
    { this.notifications = data;
      if(this.notifications.length>0){
        this.notificationCount = this.notifications.length;
      }else this.notificationCount = 0;
      
      this.words = [];
      this.notifications.forEach(notif => this.words.unshift(notif.message));
      
    }
    , error => console.log(error));

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
