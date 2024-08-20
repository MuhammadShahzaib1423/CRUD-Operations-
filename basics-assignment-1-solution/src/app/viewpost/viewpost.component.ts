import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ApiResponse, AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { Task } from '../Model/Task';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrl: './viewpost.component.css'
})
export class ViewpostComponent {
  @Output() formpopupview = new EventEmitter<boolean>();
  @Input() task: Task | null = null;

  constructor() { }
  authservice: AuthService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit() {
    console.log('view button clicked');

  }
  onCancel() {
    this.formpopupview.emit(false);
  }
  
}

