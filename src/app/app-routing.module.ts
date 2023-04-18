import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/guards/auth.guard';
import { RedirectGuard } from './_helpers/guards/redirect.guard';
import { MainlayoutComponent } from './_layout/mainlayout/mainlayout.component';

const routes: Routes = [
  { path: '', canActivate:[RedirectGuard], loadChildren: () => import('./_modules/auth/auth.module').then(m => m.AuthModule) },
  {path:'', component:MainlayoutComponent,canActivate : [AuthGuard], children:[

   { path: 'dashboard', loadChildren: () => import('./_modules/dashboard/dashboard.module').then(m => m.DashboardModule)  },
  { path: 'user', loadChildren: () => import('./_modules/user/user.module').then(m => m.UserModule) },
  { path: 'banner', loadChildren: () => import('./_modules/banner/banner.module').then(m => m.BannerModule) },
  { path: 'connectmember', loadChildren: () => import('./_modules/connectmember/connectmember.module').then(m => m.ConnectmemberModule) },
  { path: 'contact', loadChildren: () => import('./_modules/contact/contact.module').then(m => m.ContactModule) },
  { path: 'documents', loadChildren: () => import('./_modules/documents/documents.module').then(m => m.DocumentsModule) },
  { path: 'faq', loadChildren: () => import('./_modules/faq/faq.module').then(m => m.FaqModule) },
  { path: 'resourcepartner', loadChildren: () => import('./_modules/resource/resource-partner/resource-partner.module').then(m => m.ResourcePartnerModule) },
  { path: 'email', loadChildren: () => import('./_modules/email/email.module').then(m => m.EmailModule) },
  { path: 'feedback', loadChildren: () => import('./_modules/feedback/feedback.module').then(m => m.FeedbackModule) },
  { path: 'menu', loadChildren: () => import('./_modules/menu/menu.module').then(m => m.MenuModule) },
  { path: 'gallery', loadChildren: () => import('./_modules/gallery/gallery.module').then(m => m.GalleryModule) },
  { path: 'ispmember', loadChildren: () => import('./_modules/ispmember/ispmember.module').then(m => m.IspmemberModule) },
  { path: 'latestupdate', loadChildren: () => import('./_modules/latestupdate/latestupdate.module').then(m => m.LatestupdateModule) },
  { path: 'feescalculate', loadChildren: () => import('./_modules/ipv6feescalculator/ipv6feescalculator.module').then(m => m.Ipv6feescalculatorModule) },
  { path: 'links', loadChildren: () => import('./_modules/links/links.module').then(m => m.LinksModule) },
  { path: 'roles', loadChildren: () => import('./_modules/roles/roles.module').then(m => m.RolesModule) },
  { path: 'services', loadChildren: () => import('./_modules/services/services.module').then(m => m.ServicesModule) },
  { path: 'pages', loadChildren: () => import('./_modules/pages/pages.module').then(m => m.PagesModule) },
  { path: 'judgement-order', loadChildren: () => import('./_modules/judgeorder/judgeorder.module').then(m => m.JudgeorderModule) },
  { path: 'isp-acquisition-partner', loadChildren: () => import('./_modules/isp-acquisition-partner/isp-acquisition-partner.module').then(m => m.IspAcquisitionPartnerModule) },
  { path: 'natwork-master', loadChildren: () => import('./_modules/natwork-master/natwork-master.module').then(m => m.NatworkMasterModule) },
  { path: 'other-activity', loadChildren: () => import('./_modules/other-activity/other-activity.module').then(m => m.OtherActivityModule) },
  { path: 'new-isp', loadChildren: () => import('./_modules/new-isp/new-isp.module').then(m => m.NewIspModule) },
  { path: 'facility-member', loadChildren: () => import('./_modules/facility-member/facility-member.module').then(m => m.FacilityMemberModule) },
  { path: 'logo-address', loadChildren: () => import('./_modules/logo-address/logo-address.module').then(m => m.LogoAddressModule) },
  { path: 'video-gallery', loadChildren: () => import('./_modules/video-gallery/video-gallery.module').then(m => m.VideoGalleryModule) },
  { path: 'vacancies', loadChildren: () => import('./_modules/vacancies/vacancies.module').then(m => m.VacanciesModule) },
  { path: 'setting', loadChildren: () => import('./_modules/setting/setting.module').then(m => m.SettingModule) },
  { path: 'global-setting', loadChildren: () => import('./_modules/global-setting/global-setting.module').then(m => m.GlobalSettingModule) },
  { path: 'providers', loadChildren: () => import('./_modules/providers/providers.module').then(m => m.ProvidersModule) },
  { path: 'tne', loadChildren: () => import('./_modules/tne/tne.module').then(m => m.TneModule) },
  { path: 'itc', loadChildren: () => import('./_modules/itc/itc.module').then(m => m.ItcModule) },
  { path: 'news', loadChildren: () => import('./_modules/news/news.module').then(m => m.NewsModule) },
  { path: 'quick-links', loadChildren: () => import('./_modules/quick-links/quick-links.module').then(m => m.QuickLinksModule) },
  { path: 'nortification', loadChildren: () => import('./_modules/nortification/nortification.module').then(m => m.NortificationModule) },
  { path: 'tender', loadChildren: () => import('./_modules/tender/tender.module').then(m => m.TenderModule) },
  { path: 'contact-us', loadChildren: () => import('./_modules/contact-us/contact-us.module').then(m => m.ContactUsModule) },


]},
 ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
