import { AddItcComponent } from './add-itc/add-itc.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItcComponent } from './itc.component';

const routes: Routes = [
  { path: '', component: ItcComponent },
  { path: 'add', component: AddItcComponent },
  { path: 'edit/:id', component: AddItcComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItcRoutingModule { }
