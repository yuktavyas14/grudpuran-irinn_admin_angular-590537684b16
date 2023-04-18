import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewispComponent } from './add-newisp/add-newisp.component';
import { NewIspComponent } from './new-isp.component';

const routes: Routes = [
  { path: '', component: NewIspComponent },
  { path: 'add', component: AddNewispComponent },
  { path: 'edit/:id', component: AddNewispComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewIspRoutingModule { }
