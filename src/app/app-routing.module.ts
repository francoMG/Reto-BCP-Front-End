import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PropiasTransaccionesComponent } from './propias-transacciones/propias-transacciones.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'transacciones', component: LoginComponent },
  { path: 'user-settings', component: UserSettingsComponent },
  { path: 'propio', component: PropiasTransaccionesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
