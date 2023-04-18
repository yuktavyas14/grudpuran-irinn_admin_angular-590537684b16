import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTneComponent } from './add-tne/add-tne.component';
import { TneComponent } from './tne.component';

const routes: Routes = [
  { path: '', component: TneComponent },
  { path: 'add', component: AddTneComponent },
  { path: 'edit/:id', component: AddTneComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TneRoutingModule { }
