import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { ContactsComponent } from './contacts/contacts.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'dashboard', component: DashboardComponent,
  children:  [                          // <---- child components declared here
    { path: '', redirectTo: 'contacts', pathMatch: 'full' },
    { path:'home', component: HomeComponent },
    { path:'private/:group', component: PrivateChatComponent },
    { path:'contacts', component: ContactsComponent },
    { path:'userlist', component: UsersComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
