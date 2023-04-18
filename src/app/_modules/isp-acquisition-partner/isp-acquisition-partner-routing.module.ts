import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIspAcquisitionComponent } from './add-isp-acquisition/add-isp-acquisition.component';
import { IspAcquisitionPartnerComponent } from './isp-acquisition-partner.component';

const routes: Routes = [
  { path: '', component: IspAcquisitionPartnerComponent },
  { path: 'add', component: AddIspAcquisitionComponent },
  { path: 'edit/:id', component: AddIspAcquisitionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IspAcquisitionPartnerRoutingModule { }
