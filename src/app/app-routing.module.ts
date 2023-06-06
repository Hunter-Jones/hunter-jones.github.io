import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkExperienceComponent } from './tabs/work-experience/work-experience.component';
import { EducationComponent } from './tabs/education/education.component';
import { ContactMeComponent } from './tabs/contact-me/contact-me.component';
import { CsProjectsComponent } from './tabs/cs-projects/cs-projects.component';
import { DataScienceProjectsComponent } from './tabs/data-science-projects/data-science-projects.component';

const routes: Routes = 
[
  {path: 'work-experience', component: WorkExperienceComponent},
  {path: 'education', component: EducationComponent},
  {path: 'projects', component: CsProjectsComponent},
  // {path: 'cs-projects', component: CsProjectsComponent},
  // {path: 'data-projects', component: DataScienceProjectsComponent},
  // {path: 'about-me', component: ContactMeComponent},
  { path: '**', redirectTo: '/work-experience'},
  {path: '', redirectTo: 'work-experience', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
