import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  EMPTY, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ExperienceData } from './experience.model';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  constructor(private http: HttpClient, private router: Router) {}

  createExperience(data: ExperienceData) {
    const authData = this.getAuthData();
    const experienceData: ExperienceData = {
      company: data.company,
      title: data.title,
      location: data.location,
      from: data.from,
      to: data.to,
      current: data.current,
      description: data.description,
    };

    this.http
      .post('http://localhost:3002/experience/create-exp', experienceData)
      .subscribe((responseData) => {
        console.log(responseData);
        this.router.navigate(['/dashboard']);
      });


    return EMPTY;
  }

  getAllExperience() {
    return this.http.get<{}>('http://localhost:3002/experience/all');
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
