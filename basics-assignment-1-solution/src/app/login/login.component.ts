import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit {
  loginreactiveForm: FormGroup;

  constructor(private router: Router, private authservice: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loginreactiveForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
    });
  }

  showWarning() {
    if (this.loginreactiveForm.get('email').invalid && this.loginreactiveForm.get('email').touched || this.loginreactiveForm.get('email').value === '') {
      this.toastr.warning('Please Input valid email', 'Warning', {
        progressBar: true,
        timeOut: 3000,
        toastClass: 'ngx-toastr-warning',

        enableHtml: true,
      });
    }
  
  if(this.loginreactiveForm.invalid){
      this.toastr.warning('Please Input valid email and password', 'Warning', {
        progressBar: true,
        timeOut: 3000,
        toastClass: 'ngx-toastr-warning',
        enableHtml: true,
      });
    }
  }
  ShowAlert(){
    Swal.fire({
      title: 'Login Successful',
      text: 'You have successfully Login',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }
  showErrorAlert(){
    Swal.fire({
      title: 'Login Failed',
      text: 'An error occurred while Login ',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
  onsubmitlogin() {
    if (this.loginreactiveForm.invalid) {
      console.log('Invalid Form:', this.loginreactiveForm);
      this.showWarning(); 
      this.showErrorAlert();
      
      return;
    }
    
    const email = this.loginreactiveForm.value.email;
    const password = this.loginreactiveForm.value.password;
    console.log('Form Values:', this.loginreactiveForm.value);

    this.authservice.login(email, password).subscribe({
      next: (response_data: any) => {
        console.log('HTTP Response:', response_data);
        const ActualResponse = response_data.response || response_data;
        if (ActualResponse.access_token) {
          console.log('Login Successful:', response_data);
          this.ShowAlert();
          
        
        } 
        else {
          console.log('Login failed:', response_data);
          this.showWarning();
         this.showErrorAlert();
          
        }
      },
      error: (error) => {
        console.error('Login Error:', error);
        
        this.showErrorAlert();
              }
    });
  }
}
