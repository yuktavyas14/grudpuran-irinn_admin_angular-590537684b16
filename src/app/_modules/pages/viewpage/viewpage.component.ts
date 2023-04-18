import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.scss'],
  providers:[Location]
})
export class ViewpageComponent implements OnInit {
pageContent:any=''
  constructor(private _location:Location) {
    this.pageContent= localStorage.getItem('pageview')
   }

  ngOnInit(): void {
  }
  onBack(){
    this._location.back();
  }

}
