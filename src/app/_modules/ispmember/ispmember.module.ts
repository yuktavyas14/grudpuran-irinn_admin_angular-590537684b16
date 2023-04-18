import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IspmemberRoutingModule } from './ispmember-routing.module';
import { IspmemberComponent } from './ispmember.component';
import { AddIspComponent } from './add-isp/add-isp.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    IspmemberComponent,
    AddIspComponent
  ],
  imports: [
    CommonModule,
    IspmemberRoutingModule,
    CoreModule
  ]
})
export class IspmemberModule { }
