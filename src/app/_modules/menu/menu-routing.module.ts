import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFooterComponent } from './add-footer/add-footer.component'; 
import { AddMasterMenuComponent } from './add-master-menu/add-master-menu.component';
import { AddMenuListComponent } from './add-menu-list/add-menu-list.component';
import { AddSubHeaderComponent } from './add-sub-header/add-sub-header.component';
import { FooterComponent } from './footer/footer.component';
 
import { MasterMenuComponent } from './master-menu/master-menu.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuComponent } from './menu.component';
import { SubHeaderListComponent } from './sub-header-list/sub-header-list.component';

const routes: Routes = [
  
  {path : 'master-menu', component : MasterMenuComponent},
  {path : 'master-menu/add', component : AddMasterMenuComponent},
  {path : 'master-menu/edit/:id/:langId', component : AddMasterMenuComponent},


 
  {path : 'menu-list/:id', component : MenuListComponent},
  {path : 'menu-list/add/:masterHeaderId', component : AddMenuListComponent},
  {path : 'menu-list/edit/:masterHeaderId/:menuId/:langId', component : AddMenuListComponent},

  { path: 'sub-menu/:menuId', component: SubHeaderListComponent },
  { path: 'sub-menu/add/:menuId', component: AddSubHeaderComponent },
  { path: 'sub-menu/edit/:menuId/:subMenuId/:langId', component: AddSubHeaderComponent },


  { path: 'footer', component: FooterComponent },
  { path: 'footer/add', component: AddFooterComponent },
  { path: 'footer/edit/:id/:langId', component: AddFooterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
