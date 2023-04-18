import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TneRoutingModule } from './tne-routing.module';
import { TneComponent } from './tne.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { AddTneComponent } from './add-tne/add-tne.component';


@NgModule({
  declarations: [
    TneComponent,
    AddTneComponent
  ],
  imports: [
    CommonModule,
    TneRoutingModule,
    CoreModule
  ]
})
export class TneModule { }
