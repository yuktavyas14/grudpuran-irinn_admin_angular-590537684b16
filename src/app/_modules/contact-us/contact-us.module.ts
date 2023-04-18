import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { AddContactUsComponent } from './add-contact-us/add-contact-us.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    ContactUsComponent,
    AddContactUsComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    CoreModule
  ]
})
export class ContactUsModule { }
