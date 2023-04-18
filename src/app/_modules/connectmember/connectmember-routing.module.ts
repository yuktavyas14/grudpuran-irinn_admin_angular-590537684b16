import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddConnectmemberComponent } from './add-connectmember/add-connectmember.component';
import { ConnectmemberComponent } from './connectmember.component';

const routes: Routes = [
  { path: '', component: ConnectmemberComponent },
  { path: 'add', component: AddConnectmemberComponent },
  { path: 'edit/:id', component: AddConnectmemberComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectmemberRoutingModule { }
