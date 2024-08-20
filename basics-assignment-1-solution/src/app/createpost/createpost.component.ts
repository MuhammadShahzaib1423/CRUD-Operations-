import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  @Output() formPopupChange = new EventEmitter<boolean>();
  createForm: FormGroup;
  authservice: AuthService = inject(AuthService);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);
  errorMessage: string;
  selectedfile: File;

  ngOnInit() {
    this.createForm = new FormGroup({
      'Name': new FormControl(null, Validators.required),
      'Description': new FormControl(null, Validators.required),
      'Image_path': new FormControl(null, Validators.required),
    });
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
showWarning() {
  if (this.createForm.get('Name').invalid && this.createForm.get('Name').touched) {
    this.toastr.warning('Please Input valid Name', 'Warning', {
      progressBar: true,
      timeOut: 3000,
      toastClass: 'ngx-toastr-warning',
      enableHtml: true,
    });

  }
  else if (this.createForm.get('Description').invalid && this.createForm.get('Description').touched) {
    this.toastr.warning('Please Input valid Description', 'Warning', {
      progressBar: true,
      timeOut: 3000,
      toastClass: 'ngx-toastr-warning',
      enableHtml: true,
    });
  }
  else if (this.createForm.get('Image_path').invalid && this.createForm.get('Image_path').touched) {
    this.toastr.warning('Please Input valid Image_path', 'Warning', {
      progressBar: true,
      timeOut: 3000,
      toastClass: 'ngx-toastr-warning',
      enableHtml: true,
    });
  }
}

  
OnCreatepost() {
  if (this.authservice.IsLoggedIn()) {
    console.log('Form Values:', this.createForm.value);
    const { Name, Description, Image_path } = this.createForm.value;

    this.authservice.createPost(Name, Description, Image_path).subscribe({
      next: (response) => {
        console.log('HTTP Response:', response);
        const ActualResponse = response.response || response;
        if (ActualResponse.status === 'error') {
          this.errorMessage = ActualResponse.message;
          console.log('Error creating post:', ActualResponse.message);
          this.showerrormessage();
          this.showWarning();
        } else if (ActualResponse.status === 201) { 
          console.log('Post created:', ActualResponse);
          this.createForm.reset();
          this.showsuccessmessage();
          setTimeout(() => {
            this.createForm.reset(); 
            this.formPopupChange.emit(false); 
          }, 3000); 
        }
      },
      error: (error) => {
        console.log('Error creating post:', error);
        this.showerrormessage();
      }
    });
  } else {
    this.showerrormessage();
    this.router.navigate(['/login']); 
  }
}
  onCancel() {
    this.formPopupChange.emit(false); 
  }
}

