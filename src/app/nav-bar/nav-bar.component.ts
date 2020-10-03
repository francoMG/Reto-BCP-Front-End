import { Component, OnInit } from '@angular/core';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor() {}
  public counter = 0;
  faBell = faBell;
  faUser = faUser;
  ngOnInit(): void {}
  showFiller = false;
}
