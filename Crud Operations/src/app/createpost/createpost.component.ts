import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../Services/post.service';
import { AlertService } from '../Services/Alerts.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'],
})
export class CreatepostComponent implements OnInit {
  @Output() formPopupChange = new EventEmitter<boolean>();
  createForm: FormGroup;
  authservice: AuthService = inject(AuthService);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);
  postservice: PostService = inject(PostService);
  alertservice: AlertService = inject(AlertService);
  errorMessage: string;
  selectedfile: File;

  ngOnInit() {
    this.createForm = new FormGroup({
      Name: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      Image_path: new FormControl(null, Validators.required),
    });
  }

  showWarning() {
    if (
      this.createForm.get('Name').invalid &&
      this.createForm.get('Name').touched
    ) {
      this.toastr.warning('Please Input valid Name', 'Warning', {
        progressBar: true,
        timeOut: 3000,
        toastClass: 'ngx-toastr-warning',
        enableHtml: true,
      });
    } else if (
      this.createForm.get('Description').invalid &&
      this.createForm.get('Description').touched
    ) {
      this.toastr.warning('Please Input valid Description', 'Warning', {
        progressBar: true,
        timeOut: 3000,
        toastClass: 'ngx-toastr-warning',
        enableHtml: true,
      });
    } else if (
      this.createForm.get('Image_path').invalid &&
      this.createForm.get('Image_path').touched
    ) {
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
      const formData = new FormData();
      formData.append('name', this.createForm.get('Name').value);
      formData.append('description', this.createForm.get('Description').value);
      formData.append('image_path', this.selectedfile);

      this.postservice.createPost(formData).subscribe({
        next: (response) => {
          console.log('HTTP Response:', response);
          const ActualResponse = response.response || response;
          if (ActualResponse.status === 'error') {
            this.errorMessage = ActualResponse.message;
            console.log('Error creating post:', ActualResponse.message);
            this.alertservice.showerrormessage();
            this.showWarning();
          } else if (ActualResponse.status === 201) {
            console.log('Post created:', ActualResponse);
            this.createForm.reset();
            this.alertservice.showsuccessmessage();
            setTimeout(() => {
              this.createForm.reset();
              this.formPopupChange.emit(false);
            }, 3000);
          }
        },
        error: (error) => {
          console.log('Error creating post:', error);
          this.alertservice.showerrormessage();
        },
      });
    } else {
      this.alertservice.showerrormessage;
      this.router.navigate(['/login']);
    }
  }
  onFileSelected(event: any) {
    this.selectedfile = event.target.files[0];
  }

  onCancel() {
    this.formPopupChange.emit(false);
  }
}
