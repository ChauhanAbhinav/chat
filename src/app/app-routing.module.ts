import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { ContactsComponent } from './contacts/contacts.component';
import { UsersComponent } from './users/users.component';
import { GroupComponent } from './group/group.component';
import { AuthGuardService } from './services/auth-guard.service';
import { GroupListComponent } from './group-list/group-list.component';

const routes: Routes = [
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'dashboard', component: DashboardComponent,
  children:  [                          // <---- child components declared here
    { path: '', redirectTo: 'contacts', pathMatch: 'full' },
    { path: 'public', component: PublicComponent, canDeactivate: [AuthGuardService]},
    { path: 'private/:contact/:room', component: PrivateComponent},
    { path: 'group/:contact/:group', component: GroupComponent,  },
    { path: 'contacts', component: ContactsComponent },
    { path: 'userlist', component: UsersComponent },
    { path: 'grouplist', component: GroupListComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
