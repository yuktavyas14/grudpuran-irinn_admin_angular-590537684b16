import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { AddEmailComponent } from './add-email/add-email.component';


@NgModule({
  declarations: [
    EmailComponent,
    AddEmailComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    CoreModule
  ]
})
export class EmailModule { }
