import { inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Injectable({
    providedIn: "root"
    })
export class AlertService{
    constructor(){}
    toastr: ToastrService = inject(ToastrService);
    
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
      
      
  ShowSignupAlert(){
    Swal.fire({
      title: 'Signup Successful',
      text: 'You have successfully signed up',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }
  showSignupErrorAlert(){


    Swal.fire({
      title: 'Signup Failed',
      text: 'An error occurred while signing up',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
      showsuccessmessage(){
        this.toastr.success('Record addedd successfully', 'Success', {
          progressBar: true,
          timeOut: 3000,
          toastClass: 'ngx-toastr-success',
          enableHtml: true,
        });
      }
      showerrormessage(){
        this.toastr.error('Failed to Create Post', 'Error', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 3000
        });
        
      }
}