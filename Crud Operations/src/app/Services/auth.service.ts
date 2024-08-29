import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import {  Task} from "../Model/Task";



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
    createPostUrl = 'http://127.0.0.1:8000/api/posts';
    Taskarray: Task[] = [];
    
    fetchposturl = 'http://127.0.0.1:8000/api/posts';
    IsLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
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



}
