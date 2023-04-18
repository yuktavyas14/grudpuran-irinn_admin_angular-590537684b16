import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilityMemberRoutingModule } from './facility-member-routing.module';
import { FacilityMemberComponent } from './facility-member.component';
import { AddFacilityMemberComponent } from './add-facility-member/add-facility-member.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    FacilityMemberComponent,
    AddFacilityMemberComponent
  ],
  imports: [
    CommonModule,
    FacilityMemberRoutingModule,
    CoreModule
  ]
})
export class FacilityMemberModule { }
