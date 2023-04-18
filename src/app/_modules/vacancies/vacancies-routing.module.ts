import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVacanciesComponent } from './add-vacancies/add-vacancies.component';
import { VacanciesComponent } from './vacancies.component';

const routes: Routes = [
  { path: '', component: VacanciesComponent },
  { path: 'add', component: AddVacanciesComponent },
  { path: 'edit/:id', component: AddVacanciesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacanciesRoutingModule { }
