import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AlertService } from '../Services/Alerts.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authservice: AuthService = inject(AuthService);
  reactiveForm: FormGroup;
  errorMessage: string;
  alertservice: AlertService = inject(AlertService);
  toastr: ToastrService = inject(ToastrService);
    constructor() { 
    }

     
  ngOnInit() {
    this.reactiveForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      'password': new FormControl(null, [Validators.required,Validators.minLength(8)]),
      'phone': new FormControl(null, [Validators.required,  Validators.maxLength(14) ,Validators.pattern('^((\\+92-?)|0)?[0-9]{10}$')]),
    });

  }
  showWarning() {
    if (this.reactiveForm.get('name').touched && this.reactiveForm.get('name').value === '') {
      this.toastr.warning('Name is required', 'Warning', {
        progressBar: true,
        timeOut: 3000,
        toastClass: 'ngx-toastr-warning',
        enableHtml: true,
      });
    }
  
    if (this.reactiveForm.get('email').invalid && this.reactiveForm.get('email').touched) {
      this.toastr.warning('Please Input valid email', 'Warning', {
        progressBar: true,
        timeOut: 3000,
        toastClass: 'ngx-toastr-warning',
        enableHtml: true,
      });
    }
  
    if (this.reactiveForm.get('password').invalid && this.reactiveForm.get('password').touched) {
      this.toastr.warning('Password is required and must be at least 8 characters long', 'Warning', {
        progressBar: true,
        timeOut: 3000,
        toastClass: 'ngx-toastr-warning',
        enableHtml: true,
      });
    }
  
    if (this.reactiveForm.get('phone').invalid && this.reactiveForm.get('phone').touched) {
      this.toastr.warning('Please Input valid contact number', 'Warning', {
        progressBar: true,
        timeOut: 3000,
        toastClass: 'ngx-toastr-warning',
        enableHtml: true,
      });
    }
  }
  
onsubmit() {
  if (this.reactiveForm.invalid) {
    console.log('Invalid Form:', this.reactiveForm);
    this.showWarning();
    this.alertservice.showSignupErrorAlert();

    return;

  }
  else{
    this.alertservice.ShowSignupAlert();
  }

  console.log('Form Values:', this.reactiveForm.value); 

  const name = this.reactiveForm.value.name;
  const email = this.reactiveForm.value.email;
  const password = this.reactiveForm.value.password;
  const phone = this.reactiveForm.value.phone;

  this.authservice.signup(name, email, password, phone).subscribe({
    next: (response) => {
      console.log('HTTP Response:', response);
     
      const actualResponse = response.response || response;

      if (actualResponse.status === 'error') {
        this.errorMessage = actualResponse.message;
        console.log('Signup failed:', actualResponse);
     
      } 
      else if (actualResponse.status === 201) {  
        console.log('Signup successful:', actualResponse);
        
        this.reactiveForm.reset(); 
        console.log('Signup Successful trigger');
        this.alertservice.ShowSignupAlert();
   
      } 
      else {
        this.errorMessage = 'Unexpected response status';
        console.log('Unexpected response status:', actualResponse.status);
      
      }
    },
    error: (error) => {
      console.log('HTTP Error:', error);
      this.errorMessage = error.message || 'An unexpected error occurred';
      
    }
  });
}
  
  }