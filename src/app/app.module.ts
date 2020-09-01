import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material.module';
import { LayoutModule } from './modules/layout.module';
import { AuthModule } from './modules/auth.module';
import { AuthService } from './components/auth/auth.service';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { CreateProfileComponent } from './components/profile/create-profile/create-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { CreateEducationComponent } from './components/education/create-education/create-education.component';
import { CreateExperienceComponent } from './components/experience/create-experience/create-experience.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateProfileComponent,
    DashboardComponent,
    EditProfileComponent,
    ProfilesComponent,
    CreateEducationComponent,
    CreateExperienceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'DevKom',
    }),
    EffectsModule.forRoot([]),
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
