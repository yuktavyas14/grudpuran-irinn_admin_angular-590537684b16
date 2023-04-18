import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactUsComponent } from './add-contact-us/add-contact-us.component';
import { ContactUsComponent } from './contact-us.component';

const routes: Routes = [
  { path: '', component: ContactUsComponent },
  { path: 'add', component: AddContactUsComponent },
  { path: 'edit/:id/:langId', component: AddContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
