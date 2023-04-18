import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddResourseComponent } from '../add-resourse/add-resourse.component';
import { ResourcePartnerComponent } from './resource-partner.component';

const routes: Routes = [
  { path: '', component: ResourcePartnerComponent },
  { path: 'add', component: AddResourseComponent },
  { path: 'edit/:id', component: AddResourseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcePartnerRoutingModule { }
