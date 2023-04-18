import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOtherActivityComponent } from './add-other-activity/add-other-activity.component';
import { OtherActivityComponent } from './other-activity.component';

const routes: Routes = [
  { path: '', component: OtherActivityComponent },
  { path: 'add', component: AddOtherActivityComponent },
  { path: 'edit/:id', component: AddOtherActivityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherActivityRoutingModule { }
