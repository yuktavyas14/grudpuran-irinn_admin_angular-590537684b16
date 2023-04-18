import { Component,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitydesignService } from './_services/utilitydesign.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router:Router,
    public service:UtilitydesignService, public cdRef:ChangeDetectorRef) { }
    ngAfterViewChecked(){
      this.cdRef.detectChanges();
    }

}
