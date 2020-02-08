import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DisplayPageComponent } from './display-page/display-page.component';


const routes: Routes = [
    { path: 'home', component: HomePageComponent},
    { path: 'login', component: LoginPageComponent },
    { path: 'display', component: DisplayPageComponent },

    // otherwise redirect to home
    // { path: '**', redirectTo: 'login' }
];

export const appRoutingModule = RouterModule.forRoot(routes);