import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import {   PostService } from '../Services/post.service';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

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
  Taskarray: Task[] = [];
  selectedTask:Task |undefined;
  searchTerm: string = '';
  router:Router = inject(Router);

  filteredTasks: Task[] = [];
  currentPage: number = 1;
  totalPages: number = 1; 
  postService: PostService = inject(PostService);
  imgUrl = this.postService.createPostUrl + '/' +'3'+'/' ;
  authService: AuthService = inject(AuthService);


  ngOnInit() {
    this.fetchPosts(); 
  }
  fetchPosts(page: number = 1) {
    this.postService.fetchAllPosts(page).subscribe({
      next: (response) => {
        console.log('Response Posts:  ',response);
        if (response && response.response && response.response.data) {
          const allfetchtask = response.response.data.data;
          this.Taskarray = allfetchtask.filter(task => !task.deleted_at);
          this.filteredTasks = this.Taskarray.slice();
          this.currentPage = response.response.data.current_page;
          this.totalPages = response.response.data.total_pages;
          console.log('Fetched tasks:', this.Taskarray);
          console.log('filtered task image: ',this.filteredTasks);

          if (!this.authService.IsLoggedIn()) {
            console.log('User is not logged in, logging out...');
            this.authService.logout();
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

    ViewPost(id: number) {
      this.postService.viewPost(id).subscribe({
        next: (response) => {
          console.log('HTTP Response:', response);
          const ActualResponse = response.response || response;
          if (ActualResponse.status === 'error') {
            console.log('Error fetching post:', ActualResponse.message);
          } else if (ActualResponse.status === 200) {
            console.log('Post fetched:', ActualResponse);
            this.formPopupView = true;
          }
        },
        error: (error) => {
          console.error('Error fetching post:', error);
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
 
  onopencreate() {
    this.formPopup = true;
  }

  
  onclosecreate() {
    this.formPopup = false;
    
  }
  
  onopenview( task: Task) {
    this.formPopupView = true;
    this.router.navigate(['/ViewPost', task.id]);
    console.log('view button clicked');
    this.selectedTask = task;
    this.ViewPost(task.id);
  }
  oncloseview() {
    this.formPopupView = false;
  }


  onclickUpdate(task: Task) {
    this.formPopupUpdate = true;
    this.selectedTask = task;
    
    
  }
    
  oncloseUpdate() {
    this.formPopupUpdate = false;
    this.selectedTask = undefined;
    this.fetchPosts();
   
  }



  onopendelete(task:Task) {
    this.formPopupDelete = true;
    this.selectedTask = task;
    this.formPopupDelete = true;
 
  }

  oncloseDelete() {
    this.formPopupDelete = false;
    if (this.selectedTask) {
      this.Taskarray = this.Taskarray.filter(t => t.id !== this.selectedTask.id);
      this.selectedTask = null; 
  }
}


    searchQuery: string = '';

    searchTask() {
      if (this.searchQuery.trim()) {
        this.filteredTasks = this.Taskarray.filter(task => 
          task.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        
        this.filteredTasks = this.Taskarray;
      }
    }
    
  
  



}
