import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NortificationListComponent } from './nortification-list/nortification-list.component';
import { NortificationComponent } from './nortification.component';

const routes: Routes = [
  { path: '', component: NortificationListComponent },
  { path: ':id/:name', component: NortificationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NortificationRoutingModule { }
