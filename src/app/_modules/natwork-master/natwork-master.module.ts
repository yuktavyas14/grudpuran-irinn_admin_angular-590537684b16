import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NatworkMasterRoutingModule } from './natwork-master-routing.module';
import { NatworkMasterComponent } from './natwork-master.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { AddNatworkMasterComponent } from './add-natwork-master/add-natwork-master.component';


@NgModule({
  declarations: [
    NatworkMasterComponent,
    AddNatworkMasterComponent
  ],
  imports: [
    CommonModule,
    NatworkMasterRoutingModule,
    CoreModule
  ]
})
export class NatworkMasterModule { }
