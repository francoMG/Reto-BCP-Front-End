import { Component, ElementRef, OnInit } from '@angular/core';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { Notification } from './models/Notification';

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
  words = [];
  public webSocketAPI: WebSocketAPI;
  greeting: any;
 
  notificationCount = 0;
  public notifications = []
  public loggedIn;

  constructor(private notificationService : NotificationServiceService) {
    this.loggedIn = false;
    
  }

  ngOnInit() {

    // this.notificationService.getNotifByUserId(1).subscribe((data)=> 
    // { 
    //   this.notifications = data;
    //   this.notificationCount = this.notifications.length;
    //   this.notifications.forEach(notif => this.words.unshift(notif));
    //   this.sortNotifs(this.words);
      
    // }
    // , error => console.log(error));
    //makes api object for this component 
    this.webSocketAPI = new WebSocketAPI(this);
    //establishes connection with websocket API
    //this.connect();
  }

  sortNotifs(list){
    list.sort((a: Notification, b: Notification) => {
      return b.id- a.id;

  });
  }
  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }
  getNotifsByUser(uid:number){
    console.log("Getting notifications for user...")
    this.notificationService.getNotifByUserId(uid).subscribe((data)=> 
    { this.notifications = data;
      if(this.notifications.length>0){
        this.notificationCount = this.notifications.length;
      }else this.notificationCount = 0;
      
      this.words = [];
      this.notifications.forEach(notif => this.words.unshift(notif));
      this.sortNotifs(this.words);
    }
    , error => console.log(error));

  }
  handleMessage(message) {
    this.greeting = JSON.parse(message);
    this.words.unshift(this.greeting);
    this.sortNotifs(this.words);
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
    
    this.words[value].readNotif = true;
    
    var id = 'alert' + value;

    this.sendReadNotif( this.words[value]);
    // if (
    //   document.getElementById(id).classList.toggle('notShow').valueOf() == false
    // ) {
    //   document.getElementById(id).classList.toggle('notShow');
    // }
  }
 
  onClickedOutside(e: Event) {
    if (
      document.getElementById('myDropdown').classList.toggle('show') === true
    ) {
      document.getElementById('myDropdown').classList.toggle('show');
    }
  }

  sendReadNotif(notif:Notification){
    this.notificationService.changeReadStatus(notif).subscribe(data=>{
      console.log(data);
    })

  }
  unHover(){
    console.log("GSGDS");
    var but = document.getElementById("notifButton");
    but.style.transform ="scale(1.19)";
  }
 
  deleteAll(){
    console.log("Fdsadf");
    this.notificationService.deleteAll(this.webSocketAPI.uid).subscribe(data=>{
       this.words = [];
    this.notificationCount = 0;
    });
   
  }
  // Close the dropdown menu if the user clicks outside of it
}
