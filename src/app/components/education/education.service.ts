import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, EMPTY, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { EducationData } from './education.model';

@Injectable({ providedIn: 'root' })
export class EducationService {
  constructor(private http: HttpClient, private router: Router) {}

  createEducation(data: EducationData) {
    const authData = this.getAuthData();
    const educationData: EducationData = {
      school: data.school,
      degree: data.degree,
      fieldofstudy: data.fieldofstudy,
      from: data.from,
      to: data.to,
      current: data.current,
      description: data.description,
    };

    this.http
      .post('http://localhost:3002/education/create', educationData)
      .subscribe((responseData) => {
        console.log(responseData);
        this.router.navigate(['/dashboard']);
      });
    return EMPTY;
  }

  getAllEducation() {
    // return this.http.get<{}>("http://localhost:3002/profile/all");
    return this.http.get<{}>('http://localhost:3002/education/all');
  }

  getCurrentUser() {
    return this.http.get<{}>('http://localhost:3002/auth/user');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    return {
      token,
      userId,
      userName,
    };
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.message || 'server error.');
  }
}
