import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { NotificationTypesService } from '../services/notification-types.service';
import { SubscriptionsService } from '../services/subscriptions.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  public notificationTypes = [];
  preferences = [];
  public options = [];
  public oldOptions = [];
  constructor(
    private router: Router,
    private subscriptionService: SubscriptionsService,
    private appComponent: AppComponent,
    private notificationTypeService: NotificationTypesService
  ) {}
  loaded = false;
  ngOnInit(): void {
    console.log(this.appComponent.webSocketAPI.uid);
    this.subscriptionService
      .getByUser(this.appComponent.webSocketAPI.uid)
      .subscribe((data) => {
        this.preferences = data;

        this.getNotifTypes();
      });
  }

  getNotifTypes() {
    this.notificationTypeService.getNotificationTypes().subscribe((data) => {
      this.notificationTypes = data;

      this.notificationTypes.forEach((type) => {
        let chosen = false;
        this.preferences.forEach((element2) => {
          if (type.id === element2.notificationType_id) {
            chosen = true;
          }
        });

        this.options.push({ notifType: type, Chosen: chosen });
      });
      for (let i = 0; i < this.options.length; i++) {
        let t = this.options[i];
        this.oldOptions.push({ ...t });
      }
      this.loaded = true;
    });
  }

  updatePreferences() {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].Chosen != this.oldOptions[i].Chosen) {
        if (this.options[i].Chosen === false) {
          console.log({
            user_id: this.appComponent.webSocketAPI.uid,
            notificationType_id: this.options[i].notifType.id,
          });
          this.subscriptionService
            .deletePreference({
              user_id: this.appComponent.webSocketAPI.uid,
              notificationType_id: this.options[i].notifType.id,
            })
            .subscribe((data) => {
              console.log(data);
            });
        } else {
          this.subscriptionService
            .postPreference({
              user_id: this.appComponent.webSocketAPI.uid,
              notificationType_id: this.options[i].notifType.id,
            })
            .subscribe((data) => {
              console.log(data);
            });
        }
      }
    }
    this.myFunction('Settings saved!');
  }

  deleteAll() {
    this.appComponent.notificationService
      .deleteAll(this.appComponent.webSocketAPI.uid)
      .subscribe((data) => {
        this.appComponent.words = [];
        this.appComponent.notificationCount = 0;
        this.myFunction('All notifications deleted!');
        this.appComponent.empty = true;
      });
  }
  msg = '';
  myFunction(m) {
    this.msg = m;
    var x = document.getElementById('snackbar');

    x.className = 'show';

    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }
}
