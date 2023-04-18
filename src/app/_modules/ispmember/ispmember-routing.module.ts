import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIspComponent } from './add-isp/add-isp.component';
import { IspmemberComponent } from './ispmember.component';

const routes: Routes = [
  { path: '', component: IspmemberComponent },
  { path: 'add', component: AddIspComponent },
  { path: 'edit/:id', component: AddIspComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IspmemberRoutingModule { }
