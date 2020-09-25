import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, EMPTY, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { ProfileData } from './profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient, private router: Router) {}

  createProfile(data: ProfileData) {
    const authData = this.getAuthData();
    const profileData: ProfileData = {
      skills: data.skills,
      handle: data.handle,
      company: data.company,
      website: data.website,
      location: data.location,
      // user: authData.token,
      githubusername: data.githubusername,
      bio: data.bio,
      status: data.status,
      social: data.social,
    };
    // console.log(profileData)

    this.http
      .post('http://localhost:3002/profile/createprofile', profileData)
      .subscribe((responseData) => {
        console.log(responseData);
        // this.router.navigate(['/dashboard']);
      });
    // .pipe(
    //   tap((response) => response),
    //   catchError((error) => this.errorHandler(error))
    // );
    // this.router.navigate(["/dashboard"]);

    return EMPTY;
  }

  getAllProfiles() {
    // return this.http.get<{}>("http://localhost:3002/profile/all");
    return this.http.get<{}>('http://localhost:3002/profile');
  }

  getCurrentUser() {
    return this.http.get<{}>('http://localhost:3002/auth/user');
  }

  getProfileByUserId(id: number) {
    return this.http.get<{}>('http://localhost:3002/profile/profile-user/user/' + id);
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
