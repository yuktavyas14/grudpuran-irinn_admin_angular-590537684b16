import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoAddressRoutingModule } from './logo-address-routing.module';
import { LogoAddressComponent } from './logo-address.component';
import { AddLogoAddressComponent } from './add-logo-address/add-logo-address.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    LogoAddressComponent,
    AddLogoAddressComponent
  ],
  imports: [
    CommonModule,
    LogoAddressRoutingModule,
    CoreModule
  ]
})
export class LogoAddressModule { }
