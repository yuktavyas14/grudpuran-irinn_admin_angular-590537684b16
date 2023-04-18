import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewsComponent } from './add-news/add-news.component';
import { NewsComponent } from './news.component';

const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'add', component: AddNewsComponent },
  { path: 'edit/:id', component: AddNewsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
