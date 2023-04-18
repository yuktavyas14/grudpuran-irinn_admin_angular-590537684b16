import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
 
import { AddFooterComponent } from './add-footer/add-footer.component';
import { FooterComponent } from './footer/footer.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { SubHeaderListComponent } from './sub-header-list/sub-header-list.component';
import { AddSubHeaderComponent } from './add-sub-header/add-sub-header.component';
import { MasterMenuComponent } from './master-menu/master-menu.component';
import { AddMasterMenuComponent } from './add-master-menu/add-master-menu.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { AddMenuListComponent } from './add-menu-list/add-menu-list.component';


@NgModule({
  declarations: [
    MenuComponent,
   
  
    AddFooterComponent,
    FooterComponent,
    SubHeaderListComponent,
    AddSubHeaderComponent,
    MasterMenuComponent,
    AddMasterMenuComponent,
    MenuListComponent,
    AddMenuListComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule, 
    CoreModule
  ]
})
export class MenuModule { }
