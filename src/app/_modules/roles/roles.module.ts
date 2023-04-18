import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    RolesComponent,
    AddRolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    CoreModule
  ]
})
export class RolesModule { }
