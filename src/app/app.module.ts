import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyMaterialModule } from './helpers/material.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { ContactsComponent } from './contacts/contacts.component';
import { UsersComponent } from './users/users.component';
import { GroupComponent } from './group/group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PublicComponent,
    PrivateComponent,
    ContactsComponent,
    UsersComponent,
    GroupComponent,
    GroupListComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
