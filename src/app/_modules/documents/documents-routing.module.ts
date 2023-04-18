import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDocumentsComponent } from './add-documents/add-documents.component';
import { DocumentsComponent } from './documents.component';

const routes: Routes = [
  { path: '', component: DocumentsComponent },
  { path: 'add', component: AddDocumentsComponent },
  { path: 'edit/:id', component: AddDocumentsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
