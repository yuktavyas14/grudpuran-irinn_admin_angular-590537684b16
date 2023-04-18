import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { FaqComponent } from './faq.component';

const routes: Routes = [
  { path: '', component: FaqComponent },
  { path: 'add', component: AddFaqComponent },
  { path: 'edit/:id/:langId', component: AddFaqComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
