import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { ApiResponse, AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formPopupView: boolean = false;
  formPopup: boolean = false;
  formPopupUpdate: boolean = false;
  formPopupDelete: boolean = false;
  allTasks: Task[] = [];
  selectedTask?:Task;
  searchTerm: string = '';
  originalTasks: Task[] = []; 
  filteredTasks: Task[] = [];
  currentPage: number = 1;
  totalPages: number = 1; 
  authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.fetchPosts(); 
  }
    fetchPosts(page: number = 1) {
    this.authService.fetchAllPosts(page).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.response && response.response.data) {
          const allfetchtask = response.response.data.data;
          this.allTasks = allfetchtask.filter(task => !task.deleted_at);
          this.filteredTasks = this.allTasks.slice();
          this.currentPage = response.response.data.current_page;
          this.totalPages = response.response.data.total_pages;

          console.log('Fetched tasks:', this.allTasks);
          if(this.authService.isLoggedIn==false){
            console.log('logout');
            this.authService.logout();
            this.authService.router.navigate(['/login']);
          }
          
        } else {
          console.error('Response structure is not as expected:', response);
        }
       
     
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  goToPage(page: number) {
    this.fetchPosts(page);
  }
  previouspage(){
    if (this.currentPage > 1) {
      this.fetchPosts(this.currentPage - 1);
    }
  }
    nextPage() {
    if (this.currentPage < this.totalPages) {
      this.fetchPosts(this.currentPage + 1);
    }
  }
 
   openCreatePost() {
    this.formPopup = true;
  }

  openUpdatePost(updateTask: Task) {
    this.formPopupUpdate = true;    
      this.selectedTask = updateTask;
    }
    searchQuery: string = '';

    searchTask() {
      if (this.searchQuery.trim()) {
        this.filteredTasks = this.allTasks.filter(task => 
          task.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        
        this.filteredTasks = this.allTasks;
      }
    }
    closeUpdatePost() {
    this.formPopupUpdate = false;
    
  }
 openViewPost( task: Task) {
    this.formPopupView = true;
    console.log('view button clicked');
    this.selectedTask = task;
  }
  closeViewPost() {
    this.formPopupView = false;
  }
  openDeletePost(task:Task) {
    this.formPopupDelete = true;
    this.selectedTask = task;
    this.formPopupDelete = true;
  }

   closeCreatePost() {
    this.formPopup = false;
  }

  closeDeletePost() {
    this.formPopupDelete = false;
    if (this.selectedTask) {
      this.allTasks = this.allTasks.filter(t => t.id !== this.selectedTask.id);
      this.selectedTask = null; 
  }
}
}
