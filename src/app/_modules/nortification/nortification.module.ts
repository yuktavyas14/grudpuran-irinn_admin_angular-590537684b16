import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NortificationRoutingModule } from './nortification-routing.module';
import { NortificationComponent } from './nortification.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { NortificationListComponent } from './nortification-list/nortification-list.component';


@NgModule({
  declarations: [
    NortificationComponent,
    NortificationListComponent
  ],
  imports: [
    CommonModule,
    NortificationRoutingModule,
    CoreModule
  ]
})
export class NortificationModule { }
