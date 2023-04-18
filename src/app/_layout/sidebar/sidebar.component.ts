import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private router:Router) { }

  ngOnInit(): void {
      // this.loadJsFile("./assets/js/app.js"); 
  }
  public loadJsFile(url:any) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  
  onLogout(){
    localStorage.removeItem('adminUser')
    localStorage.removeItem('tokenAdmin')
    localStorage.removeItem('logedIn')
    localStorage.removeItem('marketIDuser')
     this.router.navigate(['/']);
  
  }
}
