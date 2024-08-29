import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ApiResponse, FetchTasksResponse, Task } from '../Model/Task';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor() {}
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);

  isLoggedIn: boolean = false;
  private tokenKey = 'token';
  createPostUrl = 'http://127.0.0.1:8000/api/posts';
  Taskarray: Task[] = [];
  showposturl = 'http://127.0.0.1:8000/api/posts';
  fetchposturl = 'http://127.0.0.1:8000/api/posts';
  apiUrl = 'http://127.0.0.1:8000/api';
  deleteposturl = 'http://127.0.0.1:8000/api/posts';
  updateposturl = 'http://127.0.0.1:8000/api/posts';
  IsLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts`);
  }
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  createPost(formData: FormData): Observable<any> {
    const token = this.getToken();

    return this.http.post<any>(this.createPostUrl, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  fetchAllPosts(page: number = 1): Observable<FetchTasksResponse> {
    const token = this.getToken();

    const urlWithPage = this.fetchposturl + '?page=' + page;
    return this.http
      .get<FetchTasksResponse>(urlWithPage, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.error('Backend returned code', err.status, 'body was:', err.error);
    let errorMessage = 'Unknown error occurred';

    if (err.error && err.error.response && err.error.response.message) {
      errorMessage = err.error.response.message;
    } else if (err.error && typeof err.error === 'string') {
      errorMessage = err.error;
    }
    return throwError(() => new Error(errorMessage));
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  UpdatePost(id: number, formData: FormData): Observable<any> {
    const url = this.updateposturl + '/' + id;
    const token = this.getToken();

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put<any>(url, { formData }, { headers });
  }

  fetchTasks() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + this.getToken(),
    });
    this.http.get(this.updateposturl, { headers }).subscribe({
      next: (response) => {
        console.log('Fetched posts:', response);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      },
    });
  }

  deletePost(id: number): Observable<any> {
    const token = this.getToken();
    const url = this.deleteposturl + '/' + id;
    return this.http
      .delete<any>(url, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  viewPost(id: number): Observable<any> {
    const token = this.getToken();
    const url = this.showposturl + '/' + id;
    return this.http.get<any>(url, { headers: this.getAuthHeaders() });
  }
}
