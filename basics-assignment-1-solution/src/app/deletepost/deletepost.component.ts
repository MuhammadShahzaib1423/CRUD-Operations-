import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../Model/Task';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deletepost',
  templateUrl: './deletepost.component.html',
  styleUrl: './deletepost.component.css'
})
export class DeletepostComponent {
  @Output() formPopupdelete = new EventEmitter<boolean>();
  @Input() task: Task | null = null;
  authservice: AuthService = inject(AuthService);
  toastr: ToastrService = inject(ToastrService);

  constructor() {}

  onCancel() {
    this.formPopupdelete.emit(false);
  }
  onDelete() {
    console.log('Delete method triggered');
    console.log('Task to delete:', this.task); 
  
    if (this.task) {
      this.authservice.deletePost(this.task.id).subscribe({
        next: (response: any) => {
          const ActualResponse = response.response||response;
          if (ActualResponse.status=== 200) {
            console.log('Task soft deleted successfully');
            this.toastr.success('Task soft deleted successfully', 'Success');
            this.formPopupdelete.emit(true);
          } else if (ActualResponse.status === 'error') {
            console.error('Unexpected response structure:', response);
          }
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this.toastr.error('Failed to delete task', 'Error');
        }
      });
    } else {
      console.log('Task is null or undefined');
    }
  }
}  



