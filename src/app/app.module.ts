import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './_appModules/core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './_layout/header/header.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { SidebarComponent } from './_layout/sidebar/sidebar.component';
import { MainlayoutComponent } from './_layout/mainlayout/mainlayout.component';
import { AuthGuard } from './_helpers/guards/auth.guard';
import { RoleGuard } from './_helpers/guards/role.guard';
import { TokenInterceptor } from './_helpers/interceptor/token.interceptor';
import { RedirectGuard } from './_helpers/guards/redirect.guard';
import { CookieService } from 'ngx-cookie-service';
import { Ipv6feescalculatorComponent } from './_modules/ipv6feescalculator/ipv6feescalculator.component';
import { ResourcePartnerComponent } from './_modules/resource/resource-partner/resource-partner.component';
import { AddResourseComponent } from './_modules/resource/add-resourse/add-resourse.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainlayoutComponent,
    Ipv6feescalculatorComponent,
    ResourcePartnerComponent,
    AddResourseComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
  
    
  ],
  
  providers: [

    AuthGuard,
    RedirectGuard,
    CookieService,
    // RoleGuard,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
