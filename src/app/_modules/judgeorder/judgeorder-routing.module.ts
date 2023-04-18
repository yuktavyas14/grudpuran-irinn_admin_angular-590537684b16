import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddJudeorderComponent } from './add-judeorder/add-judeorder.component';
import { JudgeorderComponent } from './judgeorder.component';

const routes: Routes = [
  { path: '', component: JudgeorderComponent },
  { path: 'add', component: AddJudeorderComponent },
  { path: 'edit/:id', component: AddJudeorderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JudgeorderRoutingModule { }
