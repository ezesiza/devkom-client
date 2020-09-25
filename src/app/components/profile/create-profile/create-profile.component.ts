import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { ProfileData } from '../profile.model';
const OPTIONS = [
  { label: '* Select Professional Status', value: '0' },
  { label: 'Developer', value: 'Developer' },
  { label: 'Real Estate Developer', value: 'Real Estate Developer' },
  { label: 'Junior Developer', value: 'Junior Developer' },
  { label: 'Senior Developer', value: 'Senior Developer' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Student or Learning', value: 'Student or Learning' },
  { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
  { label: 'Data Scientist', value: 'Data Scientist' },
  { label: 'Intern', value: 'Intern' },
  { label: 'Other', value: 'Other' },
];

@Component({
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
})
export class CreateProfileComponent implements OnInit {
  isLoading = false;
  options = [...OPTIONS];
  public changeView: boolean;
  currentUser: {};

  constructor(
    public profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eze = this.profileService.getCurrentUser().subscribe((data) => {
      this.currentUser = { ...data['user'] };
      console.log('currentUser', this.currentUser);
    });

  }

  onSignup(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      return;
    }

    const profileData: ProfileData = {
      handle: form.value.handle,
      company: form.value.company,
      website: form.value.website,
      location: form.value.location,
      status: form.value.status,
      skills: form.value.skills,
      user: this.currentUser,
      githubusername: form.value.githubusername,
      bio: form.value.bio,
      social: form.value.social,
    };

    // this.authService.registerUser(
    //   form.value.name,
    //   form.value.email,
    //   form.value.password,
    //   form.value.avatar,
    //   form.value.date,
    // );
    // this.store.dispatch(new authAction.RegisterUser());
    // console.log(profileData)

    this.profileService.createProfile(profileData).subscribe((data) => {
      console.log(data);
    });
  }

  toggleDisplay() {
    this.changeView = !this.changeView;
  }
}
