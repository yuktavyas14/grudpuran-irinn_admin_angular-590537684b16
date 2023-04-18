import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickLinksRoutingModule } from './quick-links-routing.module';
import { QuickLinksComponent } from './quick-links.component';
import { AddQuickLinksComponent } from './add-quick-links/add-quick-links.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    QuickLinksComponent,
    AddQuickLinksComponent
  ],
  imports: [
    CommonModule,
    QuickLinksRoutingModule,
    CoreModule
  ]
})
export class QuickLinksModule { }
