import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinksRoutingModule } from './links-routing.module';
import { LinksComponent } from './links.component';
import { AddLinksComponent } from './add-links/add-links.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    LinksComponent,
    AddLinksComponent
  ],
  imports: [
    CommonModule,
    LinksRoutingModule,
    CoreModule
  ]
})
export class LinksModule { }
