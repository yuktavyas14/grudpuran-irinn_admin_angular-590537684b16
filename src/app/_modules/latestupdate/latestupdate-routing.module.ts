import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLatestUpdateComponent } from './add-latest-update/add-latest-update.component';
import { LatestupdateComponent } from './latestupdate.component';

const routes: Routes = [
  { path: '', component: LatestupdateComponent },
  { path: 'add', component: AddLatestUpdateComponent },
  { path: 'edit/:id', component: AddLatestUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LatestupdateRoutingModule { }
