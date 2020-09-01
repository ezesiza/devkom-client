import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { ExperienceService } from '../experience.service';
import { ExperienceData } from '../experience.model';

@Component({
  templateUrl: './create-experience.component.html',
  styleUrls: ['./create-experience.component.css'],
})
export class CreateExperienceComponent implements OnInit {
  isLoading = false;
  // public changeCurrent: boolean | true;
  currentUser: {};
  current: boolean;

  constructor(
    public experienceService: ExperienceService,
    private router: Router
  ) {}

  ngOnInit(): void {
 this.experienceService.getCurrentUser().subscribe((data) => {
      this.currentUser = { ...data['user'] };
      // console.log(data);
    });
  }

  onSignup(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const toval = (form.value.to === undefined) ? 'Now' : form.value.to;
    const currentval = (form.value.current === undefined || form.value.current === null) ? false : form.value.current;
    const experienceData: ExperienceData = {
      company: form.value.company,
      title: form.value.title,
      location: form.value.location,
      from: form.value.from,
      to: toval,
      current: currentval,
      description: form.value.description,
    };
    this.experienceService.createExperience(experienceData).subscribe((data) => {
    });
  }

  toggleCurrent() {
    this.current = !this.current;
  }
}
