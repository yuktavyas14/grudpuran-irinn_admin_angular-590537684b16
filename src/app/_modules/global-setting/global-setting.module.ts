import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalSettingRoutingModule } from './global-setting-routing.module';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { ServicesComponent } from './banner/services/services.component';
import { AddServicesComponent } from './banner/add-services/add-services.component';
import { LanguageComponent } from './language/language.component';
import { AddLanguageComponent } from './add-language/add-language.component';
import { ListComponent } from './what-we-have/list/list.component';
import { AddComponent } from './what-we-have/add/add.component';
import { GlobalDataComponent } from './globalData/global-data/global-data.component';
import { AddGlobalDataComponent } from './globalData/add-global-data/add-global-data.component';
import { WhyListComponent } from './whyipv6/why-list/why-list.component';
import { WhyAddComponent } from './whyipv6/why-add/why-add.component';
import { GalleryListComponent } from './editor/gallery-list/gallery-list.component';
import { GalleryAddComponent } from './editor/gallery-add/gallery-add.component';


@NgModule({
  declarations: [
  
    ServicesComponent,
       AddServicesComponent,
       LanguageComponent,
       AddLanguageComponent,
       ListComponent,
       AddComponent,
       GlobalDataComponent,
       AddGlobalDataComponent,
       WhyListComponent,
       WhyAddComponent,
       GalleryListComponent,
       GalleryAddComponent
  ],
  imports: [
    CommonModule,
    GlobalSettingRoutingModule,
    CoreModule
  ]
})
export class GlobalSettingModule { }
