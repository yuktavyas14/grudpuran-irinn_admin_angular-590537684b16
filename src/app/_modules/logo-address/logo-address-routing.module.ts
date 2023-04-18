import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLogoAddressComponent } from './add-logo-address/add-logo-address.component';
import { LogoAddressComponent } from './logo-address.component';

const routes: Routes = [
  { path: '', component: LogoAddressComponent },
  { path: 'add', component: AddLogoAddressComponent },
  { path: 'edit/:id/:langId', component: AddLogoAddressComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogoAddressRoutingModule { }
