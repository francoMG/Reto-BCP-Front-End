import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(private appComponent:AppComponent) { }

  ngOnInit(): void {
  }

  deleteAll(){
    this.appComponent.deleteAll();
  }
}
