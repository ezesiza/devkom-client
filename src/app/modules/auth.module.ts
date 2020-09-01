import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer as authReducer } from './../reducers/authReducer';
import { AuthEffects } from '../components/auth/auth.effect';

const auth = [LoginComponent, RegisterComponent];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [...auth],
})
export class AuthModule {}
