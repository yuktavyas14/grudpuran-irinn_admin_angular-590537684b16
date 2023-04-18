import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItcRoutingModule } from './itc-routing.module';
import { ItcComponent } from './itc.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { AddItcComponent } from './add-itc/add-itc.component';


@NgModule({
  declarations: [
    ItcComponent,
    AddItcComponent
  ],
  imports: [
    CommonModule,
    ItcRoutingModule,
    CoreModule
  ]
})
export class ItcModule { }
