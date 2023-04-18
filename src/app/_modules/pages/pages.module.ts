import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { AddPageComponent } from './add-page/add-page.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { ViewpageComponent } from './viewpage/viewpage.component';

@NgModule({
  declarations: [
    PagesComponent,
    AddPageComponent,
    ViewpageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CoreModule,
  ]
})
export class PagesModule { }
