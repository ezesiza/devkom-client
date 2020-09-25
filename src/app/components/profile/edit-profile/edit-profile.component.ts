import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  options = [...OPTIONS];
  profile: ProfileData = {
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: [],
    social: [],
    githubusername: '',
    bio: '',
  };

  constructor(public route: ActivatedRoute,
              public profileService: ProfileService) { }

  ngOnInit() {
    const userId = JSON.parse(localStorage.getItem('userId'));
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.profileService.getProfileByUserId(parseInt(userId, 10)).subscribe((data: ProfileData) => {
        console.log(data);
        this.profile={
          handle: data.handle,
          company: data.company,
          website: data.website,
          location: data.location,
          status: data.status,
          skills: data.skills,
          githubusername: data.githubusername,
          bio: data.bio,
          social: data.social,
        }
      });

    });
  }

}
