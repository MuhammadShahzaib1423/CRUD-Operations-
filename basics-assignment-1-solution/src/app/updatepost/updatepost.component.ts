import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Task } from '../Model/Task';

@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css'] 
})
export class UpdatepostComponent implements OnInit {
  @Output() formPopupupdate = new EventEmitter<boolean>();
  @Input() task:Task| null = null;

  private route: Router = inject(Router);

  UpdatereactiveForm: FormGroup;


  constructor(private router: Router ,private authservice:AuthService) {}

  ngOnInit() {
   
    this.UpdatereactiveForm = new FormGroup({
   
      'Name': new FormControl(null, Validators.required),
      'Description': new FormControl(null, Validators.required),
      'Image_path': new FormControl(null, Validators.required),
    });
  
  }
  
  onupdatedata(){
    console.log('update button clicked');

    
    
  }
  
  onupdatepost() {
    console.log('update button clicked');
    console.log('Task to update:', this.task);
      const { Name, Description, Image_path } = this.UpdatereactiveForm.value;

    if (this.task) {
      this.authservice.UpdatePost(this.task.id, Name,Description,Image_path).subscribe({
        next: (response: any) => {
          const ActualResponse = response.response || response;
          if (ActualResponse.status === 200) {
            console.log('Task updated successfully');
            this.formPopupupdate.emit(true);
          } else {
            console.error('Unexpected response structure:', response);
          }
        },
        error: (error) => {
          console.error('Error updating task:', error);
        }
      });
    } else {
      console.log('Task is null or undefined');
    }
  }
  
  

  onCancel() {
    this.formPopupupdate.emit(false);
    console.log('cancel button clicked');

 
  }

}
