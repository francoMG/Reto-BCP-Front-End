import { Component, ElementRef, OnInit } from '@angular/core';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select';
import { Router } from '@angular/router';
import { faBell, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { Notification } from './models/Notification';

import { NotificationServiceService } from './services/notification-service.service';

import { WebSocketAPI } from './WebSocketAPI';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options = { autoHide: false, scrollbarMinSize: 100 };
  title = 'retoBCP';
  faBell = faBell;
  faCog = faCog;
  words = [];
  public webSocketAPI: WebSocketAPI;
  greeting: any;
  empty: boolean;
  notificationCount = 0;
  public notifications = [];
  public loggedIn;
  d8: Date;
  num: number;
  loaded = false;
  constructor(
    private router: Router,
    private notificationService: NotificationServiceService,
    private cookieService: CookieService
  ) {
    this.empty = false;
  }

  ngOnInit() {
    //makes api object for this component
    this.webSocketAPI = new WebSocketAPI(this);

    if (this.cookieService.get('loggedIn') === 'true') {
      this.loggedIn = true;

      let id = parseInt(this.cookieService.get('id'));
      this.webSocketAPI.uid = id;
      this.getNotifsByUser(id);
      this.webSocketAPI.targetID = id;
      this.connect(true);
    } else {
      this.loggedIn = false;
      this.router.navigate(['']);
    }
  }

  sortNotifs(list) {
    list.sort((a: Notification, b: Notification) => {
      return b.id - a.id;
    });
  }
  connect(logged) {
    this.webSocketAPI._connect(logged);
  }
  setLoggedInCookie(id) {
    this.cookieService.set('loggedIn', 'true');
    this.cookieService.set('id', '' + id);
  }
  setLoggedOutCookie() {
    this.cookieService.set('loggedIn', 'false');
  }
  disconnect() {
    this.webSocketAPI._disconnect();
  }

  getNotifsByUser(uid: number) {
    this.notificationCount = 0;
    console.log('Getting notifications for user...');
    this.notificationService.getNotifByUserId(uid).subscribe(
      (data) => {
        this.notifications = data;
        if (this.notifications.length > 0) {
          this.countUnreadNotifications();
        } else this.notificationCount = 0;
        this.loaded = true;
        this.words = [];
        this.notifications.forEach((notif) => {
          this.words.unshift(notif);
        });

        this.sortNotifs(this.words);

        if (this.words.length === 0) {
          this.empty = true;
          console.log('tra');
        }
      },
      (error) => console.log(error)
    );
  }
  handleMessage(message) {
    let msg = JSON.parse(message);

    this.words.unshift(msg);

    this.sortNotifs(this.words);
    this.notificationCount += 1;

    this.empty = false;
    this.unHover();
  }
  sendMessage(option, targetId, amount) {
    this.webSocketAPI.targetID = targetId;
    if (option === 0) {
      this.webSocketAPI._sendDeposit3rd(amount);
    } else {
      this.webSocketAPI._sendWithdrawal(amount);
    }
  }
  sendLoggedIn() {
    this.webSocketAPI._sendLoggedIn();
  }
  countUnreadNotifications() {
    this.notifications.forEach((notif) => {
      if (notif.readNotif === false) {
        this.notificationCount += 1;
      }
    });
  }

  myFunction() {
    document.getElementById('myDropdown').classList.toggle('show');
    document.getElementById('template').classList.toggle('colorTemplate');
  }
  sideBar() {
    document.getElementById('sideBar').classList.toggle('sideBarActive');
  }
  hideAlert(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.words[value].readNotif = true;

    this.sendReadNotif(this.words[value]);

    if (this.notificationCount > 0) {
      this.notificationCount -= 1;
    }
  }

  onClickedOutside(e: Event) {
    if (
      document.getElementById('myDropdown').classList.toggle('show') === true
    ) {
      document.getElementById('myDropdown').classList.toggle('show');
    }
    if (
      document.getElementById('template').classList.toggle('colorTemplate') ===
      true
    ) {
      document.getElementById('template').classList.toggle('colorTemplate');
    }
  }

  sendReadNotif(notif: Notification) {
    this.notificationService.changeReadStatus(notif).subscribe((data) => {
      console.log(data);
    });
  }

  async unHover() {
    document.getElementById('icono').classList.toggle('toggleHandle');

    document.getElementById('testing').classList.toggle('toggleHandle');
    await new Promise((r) => setTimeout(r, 600));

    //but.style.transform = `scale(0.5)`;
    document.getElementById('icono').classList.toggle('toggleHandle');

    document.getElementById('testing').classList.toggle('toggleHandle');
  }

  deleteAll() {
    this.notificationService
      .deleteAll(this.webSocketAPI.uid)
      .subscribe((data) => {
        this.words = [];
        this.notificationCount = 0;
      });
  }

  signOut() {
    this.sideBar();

    this.disconnect();
    this.setLoggedOutCookie();
    this.loggedIn = false;
    this.words = [];
    this.empty = false;
    this.router.navigate(['']);
  }
}
