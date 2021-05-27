import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EventTypeComponent } from './components/event-type/event-type.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistComponent } from './components/regist/regist.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'regist', component: RegistComponent },
  { path: 'users', component: UsersComponent },
  { path: 'eventType', component: EventTypeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: HotelsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
