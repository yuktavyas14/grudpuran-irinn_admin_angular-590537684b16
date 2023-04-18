import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';
import { TenderComponent } from './tender.component';
import { AddTenderComponent } from './add-tender/add-tender.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    TenderComponent,
    AddTenderComponent
  ],
  imports: [
    CommonModule,
    TenderRoutingModule,
    CoreModule
  ]
})
export class TenderModule { }
