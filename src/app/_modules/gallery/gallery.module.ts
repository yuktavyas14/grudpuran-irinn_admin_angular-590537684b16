import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { AddGalleryComponent } from './add-gallery/add-gallery.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    GalleryComponent,
    AddGalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    CoreModule
  ]
})
export class GalleryModule { }
