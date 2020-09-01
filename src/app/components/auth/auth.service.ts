import { AuthData } from './auth-data.model';
import { RegisterData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, EMPTY, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private firstName: string = '';
  private lastName: string = '';
  private userName: string = '';
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  /*********************/
  registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar: string,
    date: string
  ) {
    const registerData: RegisterData = {
      firstName,
      lastName,
      email,
      password,
      avatar,
      date,
    };

    this.http
      .post<{ data: RegisterData }>(
        'http://localhost:3002/auth/signup',
        registerData
      )
      .subscribe((response) => {
        console.log(response);
      });
    //   .pipe(
    //     tap((response) => {
    //       console.log(registerData);
    //       return response;
    //     }),
    //     catchError((error) => this.errorHandler(error))
    //   );
    // this.router.navigate(["/"]);
    // //console.log(registerData);
    return;
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post<{
        accessToken: string;
        expiresIn: number;
        userId: string;
        user: object;
        username: string;
      }>('http://localhost:3002/auth/signin', authData)
      .subscribe((response) => {
        console.log(response);
        const token = response.accessToken;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.user['id'];
          this.firstName = response.user['firstName'];
          this.lastName = response.user['lastName'];
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(
            token,
            expirationDate,
            this.userId,
            this.firstName,
            this.lastName
          );
          this.router.navigate(['/dashboard']);
        }
      });
    //
    return EMPTY;
  }

  getCurrentUser() {
    // return this.firstName + " " + this.lastName;
    return localStorage.getItem('userName');
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userName = authInformation.userName;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    firstName: string,
    lastName: string
  ) {
    const userName = firstName + ' ' + lastName;
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userName', userName);
  }

  private clearAuthData() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userName');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
      userName,
    };
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server error.');
  }
}
