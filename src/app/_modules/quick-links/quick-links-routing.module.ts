import { AddQuickLinksComponent } from './add-quick-links/add-quick-links.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickLinksComponent } from './quick-links.component';

const routes: Routes = [
  { path: '', component: QuickLinksComponent },
  { path: 'add', component: AddQuickLinksComponent },
  { path: 'edit/:id/:langId', component: AddQuickLinksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickLinksRoutingModule { }
