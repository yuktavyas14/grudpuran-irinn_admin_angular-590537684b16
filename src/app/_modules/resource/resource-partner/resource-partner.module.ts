import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcePartnerRoutingModule } from './resource-partner-routing.module';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
    ResourcePartnerRoutingModule
  ]
})
export class ResourcePartnerModule { }
