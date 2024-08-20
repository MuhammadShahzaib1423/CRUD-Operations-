import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component'; 
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component'; // Import the Homecomponent class
import { FormComponent } from './form/form.component';
import { authGuard } from './auth.guard';
import { UpdatepostComponent } from './updatepost/updatepost.component';
import { ViewpostComponent } from './viewpost/viewpost.component';

const routes: Routes = [ 
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    { path: 'Home', component: HomeComponent}, 
    { path: 'Login', component: LoginComponent }, 
    { path: 'Signup', component: SignupComponent},  
    {path:'Form',component:FormComponent ,canActivate:[authGuard]},
    {path:'UpdatePost',component:UpdatepostComponent},
    {path:'ViewPost',component:ViewpostComponent}
    
    
  ]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
})
export class RouteModule {}
