import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLinksComponent } from './add-links/add-links.component';
import { LinksComponent } from './links.component';

const routes: Routes = [
  { path: '', component: LinksComponent },
  { path: 'add', component: AddLinksComponent },
  { path: 'edit/:id', component: AddLinksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinksRoutingModule { }
