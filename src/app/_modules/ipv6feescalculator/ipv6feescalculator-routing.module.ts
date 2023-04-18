import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCalculateComponent } from './fees/fees-calculate/add-calculate/add-calculate.component';
import { FeesCalculateComponent } from './fees/fees-calculate/fees-calculate.component';
import { Ipv6feescalculatorComponent } from './ipv6feescalculator.component';

const routes: Routes = [
  {path : 'fees', component : FeesCalculateComponent},
  {path : 'fees/add', component : AddCalculateComponent},
  {path : 'fees/edit/:id', component : AddCalculateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ipv6feescalculatorRoutingModule { }
