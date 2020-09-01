

import { NgModule } from "@angular/core";
import { NavbarComponent } from '../components/layout/navbar/navbar.component';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../components/layout/footer/footer.component';
import { LandingComponent } from '../components/layout/landing/landing.component';

const layout = [NavbarComponent, LandingComponent, FooterComponent];


@NgModule({
    declarations: [NavbarComponent, LandingComponent, FooterComponent],
    imports: [CommonModule, RouterModule, MaterialModule],
    exports: [...layout]
})
export class LayoutModule { }
