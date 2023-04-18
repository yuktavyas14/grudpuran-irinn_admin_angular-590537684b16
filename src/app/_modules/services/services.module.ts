import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { AddServicesComponent } from './add-services/add-services.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    ServicesComponent,
    AddServicesComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    CoreModule
  ]
})
export class ServicesModule { }
