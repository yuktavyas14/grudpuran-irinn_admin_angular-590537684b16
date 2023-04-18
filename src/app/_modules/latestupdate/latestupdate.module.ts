import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LatestupdateRoutingModule } from './latestupdate-routing.module';
import { LatestupdateComponent } from './latestupdate.component';
import { AddLatestUpdateComponent } from './add-latest-update/add-latest-update.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    LatestupdateComponent,
    AddLatestUpdateComponent
  ],
  imports: [
    CommonModule,
    LatestupdateRoutingModule,
    CoreModule
  ]
})
export class LatestupdateModule { }
