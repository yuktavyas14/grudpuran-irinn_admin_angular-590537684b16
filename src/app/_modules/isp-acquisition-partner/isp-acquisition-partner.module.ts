import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IspAcquisitionPartnerRoutingModule } from './isp-acquisition-partner-routing.module';
import { IspAcquisitionPartnerComponent } from './isp-acquisition-partner.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { AddIspAcquisitionComponent } from './add-isp-acquisition/add-isp-acquisition.component';


@NgModule({
  declarations: [
    IspAcquisitionPartnerComponent,
    AddIspAcquisitionComponent
  ],
  imports: [
    CommonModule,
    IspAcquisitionPartnerRoutingModule,
    CoreModule
  ]
})
export class IspAcquisitionPartnerModule { }
