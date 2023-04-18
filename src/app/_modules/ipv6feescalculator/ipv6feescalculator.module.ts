import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ipv6feescalculatorRoutingModule } from './ipv6feescalculator-routing.module';
import { AddCalculateComponent } from './fees/fees-calculate/add-calculate/add-calculate.component';
import { FeesCalculateComponent } from './fees/fees-calculate/fees-calculate.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCalculateComponent,
    FeesCalculateComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    Ipv6feescalculatorRoutingModule
  ]
})
export class Ipv6feescalculatorModule { }
