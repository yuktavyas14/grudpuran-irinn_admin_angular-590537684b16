import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmailComponent } from './add-email/add-email.component';
import { EmailComponent } from './email.component';

const routes: Routes = [
  {path : '', component : EmailComponent},
  {path : 'add', component : AddEmailComponent},
  {path : 'edit/:id', component : AddEmailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
