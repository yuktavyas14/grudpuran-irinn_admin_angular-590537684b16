import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { AddDocumentsComponent } from './add-documents/add-documents.component';
import { CoreModule } from 'src/app/_appModules/core/core.module';


@NgModule({
  declarations: [
    DocumentsComponent,
    AddDocumentsComponent
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule, 
    CoreModule
  ]
})
export class DocumentsModule { }
