import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
import { UsersService } from '../services/users.service';

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
    private appComponent: AppComponent,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.cookieService.get('loggedIn') === 'true') {
      this.router.navigate(['transacciones']);
    } else {
      this.router.navigate(['']);
    }
  }
  myFunction() {
    var x = document.getElementById('snackbar');

    x.className = 'show';

    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }
  connect(id: number) {
    //this.appComponent.disconnect();
    this.userService
      .login({ username: id.toString(), password: '', loggedIn: null })
      .subscribe(
        (data) => {
          console.log('???');
          this.setUserId(id);
          this.setTargetId(id);
          this.appComponent.connect(false);
          //this.webSocketAPI._connect();
          this.appComponent.loggedIn = true;
          this.appComponent.setLoggedInCookie(id);
          this.router.navigate(['transacciones']);
        },
        (err) => {
          console.log(err);
          this.myFunction();
        }
      );
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
