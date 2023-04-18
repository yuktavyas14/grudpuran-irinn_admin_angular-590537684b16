import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';


@NgModule({
  declarations: [
    ChangePasswordComponent,
    PasswordStrengthComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    CoreModule
  ]
})
export class SettingModule { }
