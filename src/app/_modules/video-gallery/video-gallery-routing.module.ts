import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVideoGalleryComponent } from './add-video-gallery/add-video-gallery.component';
import { VideoGalleryComponent } from './video-gallery.component';
import { ViewVideoComponent } from './view-video/view-video.component';

const routes: Routes = [
  { path: '', component: VideoGalleryComponent },
  { path: 'add', component: AddVideoGalleryComponent },
  { path: 'edit/:id', component: AddVideoGalleryComponent },
  { path: 'view/:id', component: ViewVideoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoGalleryRoutingModule { }
