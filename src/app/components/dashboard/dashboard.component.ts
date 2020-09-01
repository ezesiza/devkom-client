import { Component, OnInit } from '@angular/core';
import { EducationService } from '../education/education.service';
import { ExperienceService } from '../experience/experience.service';
import { ProfileService } from '../profile/profile.service';
const experience = [
  { company: 'Izu Trans Corps', title: 'Logistics', years: '2020' },
  { company: 'ABC Transport', title: 'Shipping', years: '2020' },
  { company: 'Airik Airways', title: 'Hauling', years: '2020' },
  { company: 'Ifesinachi', title: 'Transportation', years: '2020' },
];
const education = [
  {
    institution: 'University of Utopia',
    title: 'Underwater Life',
    years: '2020',
  },
  {
    institution: 'Technical University of Beulah',
    title: 'Engineering',
    years: '2020',
  },
  {
    institution: 'University of Economics',
    title: 'Micro-Finance',
    years: '2020',
  },
  {
    institution: 'School of Commerce',
    title: 'Rural Developement',
    years: '2020',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['company', 'title', 'years', 'delete'];

  public hasProfile: boolean;
  userNowId: string;
  profileUser: object;
  public eduList = [];
  public myedu = [];
  public myexp = [];

  dataSource = [];
  dataSource2 = [];

  constructor(
    public profileService: ProfileService,
    public educationService: EducationService,
    public experienceService: ExperienceService
  ) {}

  ngOnInit() {
    this.userNowId = JSON.parse(localStorage.getItem('userId'));
    this.profileService.getAllProfiles().subscribe((data) => {
      this.profileUser = data['foundProfile'].find((item) => {
        
        return item.userId === this.userNowId
      });
      console.log(this.profileUser),
      (this.profileUser && (this.userNowId === this.profileUser['userId']))
      ? (this.hasProfile = true)
      : (this.hasProfile = false);
    });

    this.educationService.getAllEducation().subscribe((data: []) => {
       this.myedu =  data.filter((item: any) => item.userId === this.userNowId);
       this.dataSource = [...this.myedu];
       console.log(this.dataSource);
      });

    this.experienceService.getAllExperience().subscribe((data: []) => {
      this.myexp =  data.filter((item: any) => item.user.id === this.userNowId);
      this.dataSource2 = [...this.myexp];
      console.log(this.dataSource2);
      });
  }
}
