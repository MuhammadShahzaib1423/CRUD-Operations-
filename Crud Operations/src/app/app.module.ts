import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { RouteModule } from './route.module';
import { CreatepostComponent } from './createpost/createpost.component';
import { UpdatepostComponent } from './updatepost/updatepost.component';
import { DeletepostComponent } from './deletepost/deletepost.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { ViewpostComponent } from './viewpost/viewpost.component';





@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    FormComponent,
    
    CreatepostComponent,
    UpdatepostComponent,
    DeletepostComponent,
    NavbarComponent,
   
    ViewpostComponent
    
  
    
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot( ),
    HttpClientModule,
    BrowserAnimationsModule, 
    RouteModule,
    
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
