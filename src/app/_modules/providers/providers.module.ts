import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';
import { AddProvidersComponent } from './add-providers/add-providers.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    ProvidersComponent,
    AddProvidersComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    CoreModule
  ]
})
export class ProvidersModule { }
