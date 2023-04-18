import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProvidersComponent } from './add-providers/add-providers.component';
import { ProvidersComponent } from './providers.component';

const routes: Routes = [
  { path: '', component: ProvidersComponent },
  { path: 'add', component: AddProvidersComponent },
  { path: 'edit/:id', component: AddProvidersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
