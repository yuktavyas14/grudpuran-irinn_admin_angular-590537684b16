import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGalleryComponent } from './add-gallery/add-gallery.component';
import { GalleryComponent } from './gallery.component';

const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'add', component: AddGalleryComponent },
  { path: 'edit/:id', component: AddGalleryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
