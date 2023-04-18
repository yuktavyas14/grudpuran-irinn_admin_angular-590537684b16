import { GlobalDataComponent } from './globalData/global-data/global-data.component';
import { AddComponent } from './what-we-have/add/add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLanguageComponent } from './add-language/add-language.component';
import { AddServicesComponent } from './banner/add-services/add-services.component';
import { ServicesComponent } from './banner/services/services.component';
import { LanguageComponent } from './language/language.component';
import { ListComponent } from './what-we-have/list/list.component';
import { AddGlobalDataComponent } from './globalData/add-global-data/add-global-data.component';
import { WhyListComponent } from './whyipv6/why-list/why-list.component';
import { WhyAddComponent } from './whyipv6/why-add/why-add.component';
import { GalleryListComponent } from './editor/gallery-list/gallery-list.component';
import { GalleryAddComponent } from './editor/gallery-add/gallery-add.component';

const routes: Routes = [
  { path: 'banner', component: ServicesComponent },
  { path: 'banner/add', component: AddServicesComponent },
  { path: 'banner/edit/:id', component: AddServicesComponent },

  { path: 'languages', component: LanguageComponent },
  { path: 'languages/add', component: AddLanguageComponent },
  { path: 'languages/edit/:id', component: AddLanguageComponent },

  { path: 'wwh', component: ListComponent },
  { path: 'wwh/add', component: AddComponent },
  { path: 'wwh/edit/:id/:langId', component: AddComponent },

  { path: 'data', component: GlobalDataComponent },
  { path: 'data/add', component: AddGlobalDataComponent },
  { path: 'data/edit/:id/:langId', component: AddGlobalDataComponent },
  
  { path: 'why-ipv6', component: WhyListComponent },
  { path: 'why-ipv6/add', component: WhyAddComponent },
  { path: 'why-ipv6/edit/:id/:langId', component: WhyAddComponent },

  { path: 'editor-gallery', component: GalleryListComponent },
  { path: 'editor-gallery/add', component: GalleryAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalSettingRoutingModule { }
