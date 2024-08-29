import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Task } from '../Model/Task';
import { PostService } from '../Services/post.service';

@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css'],
})
export class UpdatepostComponent implements OnInit {
  @Output() formPopupupdate = new EventEmitter<boolean>();
  @Input() task: Task | null = null;
  selectedfile: File | null = null;
  UpdatereactiveForm: FormGroup;
  errormessage: string = '';
  router: Router = inject(Router);
  authservice: AuthService = inject(AuthService);
  postservice: PostService = inject(PostService);

  dataForm: FormGroup;

  constructor(private fb: FormBuilder) {}
  IMGURL = 'http://127.0.0.1:8000/';

  ngOnInit() {
    // this.UpdatereactiveForm = new FormGroup({
    //   Name: new FormControl(this.task?.name || '', Validators.required),
    //   Description: new FormControl(
    //     this.task?.description || '',
    //     Validators.required
    //   ),
    //   Image_path: new FormControl(null),
    // });

    this.dataForm = this.fb.group({
      name: ['a', Validators.required],
      description: ['b', Validators.required],
      image_path: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedfile = event.target.files[0];
  }

  onupdatePost() {
    console.log('Update button clicked');

    // const formData = new FormData();
    // formData.append('name', this.UpdatereactiveForm.get('Name')?.value || '');
    // formData.append(
    //   'description',
    //   this.UpdatereactiveForm.get('Description')?.value || ''
    // );

    // if (this.selectedfile) {
    //   formData.append('image_path', this.selectedfile);
    // } else {
    //   formData.append('image_path', '');
    // }

    // formData.forEach((value, key) => {
    //   if (value instanceof File) {
    //     console.log(`${key}: ${value.name}`);
    //   } else {
    //     console.log(`${key}: ${value}`);
    //   }
    // });

    const newFormData = new FormData();
    newFormData.append('name', this.dataForm.value.name);
    newFormData.append('description', this.dataForm.value.description);
    newFormData.append('image_path', this.dataForm.value.image_path);

    console.log('new form data:', newFormData);

    this.postservice.UpdatePost(this.task.id, newFormData).subscribe({
      next: (response) => {
        console.log('HTTP Response:', response);
        const ActualResponse = response.response;
        if (ActualResponse.status === 200) {
          console.log('Post updated:', ActualResponse.data);

          this.dataForm.reset();
          this.formPopupupdate.emit(true);
        } else {
          this.errormessage = ActualResponse.message;
          console.log('Error updating post:', ActualResponse.message);
        }
      },
      error: (error) => {
        console.error('Error updating task:', error);
        if (error.status === 401) {
          this.errormessage = 'Unauthorized access. Please log in again.';
        } else {
          this.errormessage = 'Error updating task. Please try again.';
        }
      },
    });
  }

  onCancel() {
    this.formPopupupdate.emit(false);
    console.log('Cancel button clicked');
  }
}
