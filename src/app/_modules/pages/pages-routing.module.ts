import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from './add-page/add-page.component';
import { PagesComponent } from './pages.component';
import { ViewpageComponent } from './viewpage/viewpage.component';

const routes: Routes = [
  { path: '', component: PagesComponent },
  { path: 'add', component: AddPageComponent },
  { path: 'edit/:id/:pageId', component: AddPageComponent },
  { path: 'pageview', component: ViewpageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
