import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectmemberRoutingModule } from './connectmember-routing.module';
import { ConnectmemberComponent } from './connectmember.component';
import { AddConnectmemberComponent } from './add-connectmember/add-connectmember.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    ConnectmemberComponent,
    AddConnectmemberComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ConnectmemberRoutingModule
  ]
})
export class ConnectmemberModule { }
