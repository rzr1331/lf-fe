import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DisplayPageComponent } from './display-page/display-page.component';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    appRoutingModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    HomePageComponent,
    LoginPageComponent,
    DisplayPageComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/