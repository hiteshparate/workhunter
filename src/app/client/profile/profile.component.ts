import { Component, OnInit } from '@angular/core';
//import { FileUploader, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { Register } from 'src/app/register';
//import { _getViewData } from '@angular/core/src/render3/instructions';
import { ProfileDataService } from 'src/app/services/profile-data.service';
import { User, Profile } from 'src/app/user';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ImageURL } from 'src/app/image-url';
import { DomSanitizer } from '@angular/platform-browser';

const URL = "http://localhost:3000/api/upload";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  USER = JSON.parse(sessionStorage.getItem('currentUser'));
 
  //public imagePath;
  //imgURL: any;
  public message: string;
  profile: Profile = new Profile();
  isUser : boolean;
  iUrl : string;
  //profileImage : string = "H:/LearnAngular/api/uploads" ;
  img : string;
  trustedurl ;
  tempurl : string = "http://localhost:3000/uploads/" ;
  

  

  constructor() { 
      //this.trustedurl = sanitizer.bypassSecurityTrustUrl(this.tempurl);
    }

  register: Register = new Register();
 
  ngOnInit() {
  }

  getUserData() {}

  getClientData() {}
}
