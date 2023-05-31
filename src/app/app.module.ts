import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TabsComponent } from './tabs/tabs.component';
import { EducationComponent } from './tabs/education/education.component';
import { WorkExperienceComponent } from './tabs/work-experience/work-experience.component';
import { CsProjectsComponent } from './tabs/cs-projects/cs-projects.component';
import { DataScienceProjectsComponent } from './tabs/data-science-projects/data-science-projects.component';
import { ContactMeComponent } from './tabs/contact-me/contact-me.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TabsComponent,
    EducationComponent,
    WorkExperienceComponent,
    CsProjectsComponent,
    DataScienceProjectsComponent,
    ContactMeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
