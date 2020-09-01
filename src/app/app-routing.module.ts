import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/layout/landing/landing.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateProfileComponent } from './components/profile/create-profile/create-profile.component';
import { AuthGuard } from './components/auth/auth.guard';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { CreateEducationComponent } from './components/education/create-education/create-education.component';
import { CreateExperienceComponent } from './components/experience/create-experience/create-experience.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'createprofile',
    component: CreateProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editprofile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profiles',
    component: ProfilesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-education',
    component: CreateEducationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-experience',
    component: CreateExperienceComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
