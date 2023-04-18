import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoGalleryRoutingModule } from './video-gallery-routing.module';
import { VideoGalleryComponent } from './video-gallery.component';
import { AddVideoGalleryComponent } from './add-video-gallery/add-video-gallery.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';
import { ViewVideoComponent } from './view-video/view-video.component';


@NgModule({
  declarations: [
    VideoGalleryComponent,
    AddVideoGalleryComponent,
    ViewVideoComponent
  ],
  imports: [
    CommonModule,
    VideoGalleryRoutingModule,
    CoreModule
  ]
})
export class VideoGalleryModule { }
