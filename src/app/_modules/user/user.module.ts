import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { MemberListComponent } from './member-list/member-list.component';


@NgModule({
  declarations: [
    UserComponent,
    AddUserComponent,
    MemberListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule
  ]
})
export class UserModule { }
