import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    NewsComponent,
    AddNewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    CoreModule
  ]
})
export class NewsModule { }
