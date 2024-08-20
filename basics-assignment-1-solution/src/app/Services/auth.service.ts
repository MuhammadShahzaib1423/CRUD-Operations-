import { HttpClient, HttpErrorResponse, HttpFeatureKind, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, tap } from "rxjs";

import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { Task } from "../Model/Task";


export interface ApiResponse {
  response: {
    message: string;
    status: number;
    data: {
      current_page: number;
      total_pages: number; 
      data: Task[]; 
    };
  };
}
@Injectable({
    providedIn: "root"
    })

export class AuthService {
  constructor(){}
    router:Router=inject(Router);
    http:HttpClient= inject (HttpClient);
    private loginUrl = 'http://127.0.0.1:8000/api/login';
    isLoggedIn: boolean = false;
    private tokenKey = 'token'; 
    private createPostUrl = 'http://127.0.0.1:8000/api/posts';
    UpdatePostUrl = ' http://127.0.0.1:8000/api/posts';
    fetchposturl = 'http://127.0.0.1:8000/api/posts';

    IsLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private signupUrl = 'http://127.0.0.1:8000/api/register';
    signup(name: string, email: string, password: string, phone: string): Observable<any> {
        return this.http.post<any>(this.signupUrl, { name, email, password, phone })
          .pipe(
            catchError(this.handleError)
          );
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

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(this.loginUrl, { email, password })
          .pipe(
            tap((response_data: any) => {
              if (response_data.response && response_data.response.access_token) {
                localStorage.setItem('token', response_data.response.access_token);
                this.isLoggedIn = true;
                this.router.navigate(['/Form']);
                if(response_data.response.access_token === null){
                  this.router.navigate(['/Login']);
                }

              }
            }),
            catchError(this.handleError)
          );
      }
    
      logout() {
        localStorage.removeItem('token');
        this.isLoggedIn = false;
        this.router.navigate(['/Home']);
      }

  createPost(name: string, description: string, imagePath:File): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer' + token);
    const postData = { name, description, image_path: imagePath};

    return this.http.post<any>(this.createPostUrl, postData, { headers });
  }
 
  fetchAllPosts(page: number = 1): Observable<ApiResponse> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const urlWithPage = this.fetchposturl + '?page=' + page;
    return this.http.get<ApiResponse>(urlWithPage, { headers })
      .pipe(catchError(this.handleError));
}
  deletePost(id: number): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    const url = this.createPostUrl + '/' + id;

    return this.http.delete<void>(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
}

UpdatePost(id: number, name: string, description: string, imagePath: File): Observable<void> {
  const token = this.getToken();
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  const postdata = { name, description, image_path: imagePath };
  const url = this.createPostUrl + '/' + id;
  return this.http.put<void>(url, postdata, { headers });
}

}
