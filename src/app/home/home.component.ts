import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentId: number;
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    if (this.cookieService.get('loggedIn') === 'true') {
      this.router.navigate(['transacciones']);
    } else {
      this.router.navigate(['']);
    }
  }

  connect(id: number) {
    //this.appComponent.disconnect();
    this.setUserId(id);
    this.setTargetId(id);
    this.appComponent.connect(false);
    //this.webSocketAPI._connect();
    this.appComponent.loggedIn = true;
    this.appComponent.setLoggedInCookie(id);
    this.router.navigate(['transacciones']);
  }
  setTargetId(text: number) {
    //this.webSocketAPI.uid = text;
    this.appComponent.webSocketAPI.targetID = text;
  }
  setUserId(text: number) {
    this.appComponent.webSocketAPI.uid = text;
    this.appComponent.getNotifsByUser(text);
  }
}
