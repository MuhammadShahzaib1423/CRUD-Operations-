import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {  AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../Model/Task';
import { PostService } from '../Services/post.service';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrl: './viewpost.component.css'
})
export class ViewpostComponent {
  @Output() formpopupview = new EventEmitter<boolean>();
  @Input() task: Task | null = null;
  authservie: AuthService = inject(AuthService);
    postservice: PostService = inject(PostService);
  imgurl: string = '';

  constructor() { }
  authservice: AuthService = inject(AuthService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.fetchTask(id);
      }
    });
  }
    

  
  fetchTask(id: number) {
    this.postservice.viewPost(id).subscribe({
      next: (response) => {
        const ActualResponse = response.response || response;
        if (ActualResponse.status === 200 && ActualResponse.data) {
          this.task = ActualResponse.data;
          this.imgurl = 'http://127.0.0.1:8000/' + this.task.image_path;
        } else {
          console.error('Error fetching post:', ActualResponse.message);
        }
      },
      error: (error) => {
        console.error('Error fetching post:', error);
      }
    });
  }


  
 
  onCancel() {
    this.router.navigate(['/Form']);
  }
  
}

