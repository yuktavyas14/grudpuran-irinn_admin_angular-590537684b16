import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServicesComponent } from './add-services/add-services.component';
import { ServicesComponent } from './services.component';

const routes: Routes = [
  { path: '', component: ServicesComponent },
  { path: 'add', component: AddServicesComponent },
  { path: 'edit/:id/:langId', component: AddServicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
