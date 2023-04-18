import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { Component, Inject, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
declare const $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userInfo:any= new User().getData();
  classToggled = false;
  feedbackComplainData:any;
  totalCount:any;
  intervalId:any;
  constructor(private service:UserService,private uService: UtilitydesignService,private router:Router,private renderer: Renderer2,@Inject(DOCUMENT) private document: Document,) { }

  ngOnInit(): void {
    this.getFeedbcakList();
    this.intervalId = setInterval(() => {
      this.getFeedbcakList(); 
    }, 5000);
    
   
    // this.loadJsFile("./assets/js/app.js"); 
}
public loadJsFile(url:any) {  
  let node = document.createElement('script');  
  node.src = url;  
  node.type = 'text/javascript';  
  document.getElementsByTagName('head')[0].appendChild(node);  
} 
onmenu(){
  this.classToggled= !this.classToggled;
  if(this.classToggled){
  this.renderer.addClass(this.document.body, 'toggle-sidebar')
    
  }else{
  this.renderer.removeClass(this.document.body, 'toggle-sidebar')

  }
  
 
}
onMobilemenu(){
  this.classToggled= !this.classToggled;
  if(this.classToggled){
  this.renderer.addClass(this.document.body, 'toggle-sidebar')
    
  }else{
  this.renderer.removeClass(this.document.body, 'toggle-sidebar')

  }

  // mini-sidebar
  // var $wrapper = $('.main-wrapper');
	// var $pageWrapper = $('.page-wrapper');
	// var $slimScrolls = $('.slimscroll');
	// 	$wrapper.toggleClass('slide-nav');
	// 	$('.sidebar-overlay').toggleClass('opened');
	// 	$('html').addClass('menu-opened');
	// 	$('#task_window').removeClass('opened');
	// 	return false;
 
}
onLogout(){
  localStorage.removeItem('adminUser')
  localStorage.removeItem('tokenAdmin')
  localStorage.removeItem('logedIn')
  localStorage.removeItem('marketIDuser')
   this.router.navigate(['/']);

}
dayAgo(date:any){

  
  let current:any= new Date();
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;
  
  let datum = Date.parse(date);
  let datum1 = Date.parse(current);
  let date1:any= datum/1000;  
  let date2:any= datum1/1000;  
  let elapsed = date2 - date1;
  
  if (elapsed < msPerMinute) {
       return Math.round(elapsed/1000) + ' seconds ago';   
  }
  
  else if (elapsed < msPerHour) {
       return Math.round(elapsed/msPerMinute) + ' minutes ago';   
  }
  
  else if (elapsed < msPerDay ) {
       return Math.round(elapsed/msPerHour ) + ' hours ago';   
  }

  else if (elapsed < msPerMonth) {
       return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
  }
  
  else if (elapsed < msPerYear) {
       return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
  }
  
  else {
       return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
  }
}
onUpdateFbNCpStatusById(item:any){
  this.router.navigate(['/nortification',item.id, item.name])
 
}
getFeedbcakList(){
  this.service.feedbackComplainList().subscribe((res: any) => {
    // this.uService.isLoading = false;
    if (res.status) {
      this.totalCount= res.body;
      this.feedbackComplainData = res.data;
    }
  });
}
ngOnDestroy() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
}
}
