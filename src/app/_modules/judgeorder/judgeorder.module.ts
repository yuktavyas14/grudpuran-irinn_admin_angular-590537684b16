import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JudgeorderRoutingModule } from './judgeorder-routing.module';
import { JudgeorderComponent } from './judgeorder.component';
import { AddJudeorderComponent } from './add-judeorder/add-judeorder.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    JudgeorderComponent,
    AddJudeorderComponent
  ],
  imports: [
    CommonModule,
    JudgeorderRoutingModule,
    CoreModule
  ]
})
export class JudgeorderModule { }
