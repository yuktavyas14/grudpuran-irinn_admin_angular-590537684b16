import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    FaqComponent,
    AddFaqComponent
  ],
  imports: [
    CommonModule,
    FaqRoutingModule, 
    CoreModule
  ]
})
export class FaqModule { }
