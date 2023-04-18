import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewIspRoutingModule } from './new-isp-routing.module';
import { NewIspComponent } from './new-isp.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { AddNewispComponent } from './add-newisp/add-newisp.component';


@NgModule({
  declarations: [
    NewIspComponent,
    AddNewispComponent
  ],
  imports: [
    CommonModule,
    NewIspRoutingModule,
    CoreModule
  ]
})
export class NewIspModule { }
