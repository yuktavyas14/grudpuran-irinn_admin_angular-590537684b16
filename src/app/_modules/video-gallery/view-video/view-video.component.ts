import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from 'src/app/_services/pages.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { User } from 'src/app/_models/user';
import { RoleService } from 'src/app/_services/role.service';
import { VideoGalleryService } from 'src/app/_services/video-gallery.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.scss'],
})
export class ViewVideoComponent implements OnInit {
  userInfo = new User().getData();
  videoDetail:any;
  urlSafe:any;
  videoId: any;
  constructor(
    public sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private service: VideoGalleryService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private uService: UtilitydesignService
  ) {
    this._ac.paramMap.subscribe((param) => {
      this.videoId = param.get('id');
      //alert(this.matchId)
    });

    if (this.videoId) {
      this.uService.isLoading = true;

      this.service.getVideoById(this.videoId).subscribe((res: any) => {
        this.uService.isLoading = false;
        this.videoDetail= res.data;
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.videoDetail.videoIframe);
        
      });
    }
  }

  ngOnInit(): void {}
}
