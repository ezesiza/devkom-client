import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import * as authReducer from 'src/app/reducers/authReducer';
import { EducationService } from '../education.service';
import { EducationData } from '../education.model';

@Component({
  templateUrl: './create-education.component.html',
  styleUrls: ['./create-education.component.css'],
})
export class CreateEducationComponent implements OnInit {
  isLoading = false;
  public changeCurrent: boolean;
  currentUser: {};
  current: false;
  private mode = 'create';

  constructor(
    private store: Store<authReducer.AuthState>,
    public educationService: EducationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eze = this.educationService.getCurrentUser().subscribe((data) => {
      this.currentUser = { ...data['user'] };
    });

    const edus = this.educationService.getAllEducation().subscribe(edus=>{
      console.log('All Education', edus);
    });
  }

  onSignup(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const toval = (form.value.to === undefined) ? 'Now' : form.value.to;

    const educationData: EducationData = {
      school: form.value.school,
      degree: form.value.degree,
      fieldofstudy: form.value.fieldofstudy,
      from: form.value.from,
      to: toval,
      current: form.value.current,
      user: this.currentUser,
      description: form.value.description,
    };
    this.educationService.createEducation(educationData).subscribe((data) => {
      console.log(data);
    });
  }

  toggleCurrent() {
    this.changeCurrent = !this.changeCurrent;
  }
}
