import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTenderComponent } from './add-tender/add-tender.component';
import { TenderComponent } from './tender.component';

const routes: Routes = [
  { path: '', component: TenderComponent },
  { path: 'add', component: AddTenderComponent },
  { path: 'edit/:id/:langId', component: AddTenderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule { }
