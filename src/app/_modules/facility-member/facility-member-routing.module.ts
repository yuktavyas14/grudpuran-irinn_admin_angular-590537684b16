import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFacilityMemberComponent } from './add-facility-member/add-facility-member.component';
import { FacilityMemberComponent } from './facility-member.component';

const routes: Routes = [
  { path: '', component: FacilityMemberComponent },
  { path: 'add', component: AddFacilityMemberComponent },
  { path: 'edit/:id', component: AddFacilityMemberComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilityMemberRoutingModule { }
