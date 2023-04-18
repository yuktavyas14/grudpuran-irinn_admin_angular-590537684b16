import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacanciesRoutingModule } from './vacancies-routing.module';
import { VacanciesComponent } from './vacancies.component';
import { AddVacanciesComponent } from './add-vacancies/add-vacancies.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    VacanciesComponent,
    AddVacanciesComponent
  ],
  imports: [
    CommonModule,
    VacanciesRoutingModule,
    CoreModule

  ]
})
export class VacanciesModule { }
