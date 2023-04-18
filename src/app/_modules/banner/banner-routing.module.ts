import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { BannerComponent } from './banner.component';
import { EditBannerComponent } from './edit-banner/edit-banner.component';

const routes: Routes = [
  { path: '', component: BannerComponent },
  { path: 'add', component: AddBannerComponent },
  { path: 'edit/:id/:langId', component: EditBannerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
