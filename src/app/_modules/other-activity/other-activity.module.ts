import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherActivityRoutingModule } from './other-activity-routing.module';
import { OtherActivityComponent } from './other-activity.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { AddOtherActivityComponent } from './add-other-activity/add-other-activity.component';


@NgModule({
  declarations: [
    OtherActivityComponent,
    AddOtherActivityComponent
  ],
  imports: [
    CommonModule,
    OtherActivityRoutingModule,
    CoreModule
  ]
})
export class OtherActivityModule { }
