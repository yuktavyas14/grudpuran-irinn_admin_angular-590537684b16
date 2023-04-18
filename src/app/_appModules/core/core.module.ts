import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrialModule } from '../matrial/matrial.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ToastrModule } from 'ngx-toastr';
import { NumberOnlyDirective } from 'src/app/_directives/number-only.directive';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    NumberOnlyDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatrialModule,
    HttpClientModule,
    AngularEditorModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 800,
      tapToDismiss: true,
      closeButton: true
    }),
      
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    MatrialModule,
    AngularEditorModule,
    EditorModule,
    ToastrModule,
    NgxPaginationModule,
    NumberOnlyDirective,
   

  ],
})
export class CoreModule { }
