import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { EditBannerComponent } from './edit-banner/edit-banner.component';


@NgModule({
  declarations: [
    BannerComponent,
    AddBannerComponent,
    EditBannerComponent
  ],
  imports: [
    CommonModule,
    BannerRoutingModule,
    CoreModule
  ]
})
export class BannerModule { }
