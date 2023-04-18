import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNatworkMasterComponent } from './add-natwork-master/add-natwork-master.component';
import { NatworkMasterComponent } from './natwork-master.component';

const routes: Routes = [
  { path: '', component: NatworkMasterComponent },
  { path: 'add', component: AddNatworkMasterComponent },
  { path: 'edit/:id', component: AddNatworkMasterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NatworkMasterRoutingModule { }
