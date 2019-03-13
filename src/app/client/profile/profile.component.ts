import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { Register } from 'src/app/register';
import { _getViewData } from '@angular/core/src/render3/instructions';
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
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' 
} );
  public imagePath;
  imgURL: any;
  public message: string;
  profile: Profile = new Profile();
  isUser : boolean;
  iUrl : string;
  profileImage : string = "H:/LearnAngular/api/uploads" ;
  img : string;
  trustedurl ;
  tempurl : string = "http://localhost:3000/uploads/" ;
  

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  constructor(private profileService: ProfileDataService , private router : Router ,
    private sanitizer : DomSanitizer) { 
      this.trustedurl = sanitizer.bypassSecurityTrustUrl(this.tempurl);
    }

  register: Register = new Register();
 
  ngOnInit() {
   
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: FileItem, response: string, status: any, headers: any ) => {
       var temp = JSON.parse(response);
        this.iUrl = temp.imageUrL;
        var u = JSON.parse(sessionStorage.getItem('currentUser'));
        this.profileService.postimage(u.id ,u.role , this.iUrl).subscribe(res=>{
          if(res.Error == undefined){
            Swal.fire("Image Has been Uploaded");

          }
          else{
            Swal.fire("Errror Occured");
          }
        })
       
       
     
    };

    var user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user.role == "client") {
      this.isUser=true;
      this.getClientData();
    }
   else {
      this.isUser=false;
      this.getUserData();
      console.log(this.profile.email);
      
    
    }
  }

  getUserData() {
    var user = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(user);
    if (user.username != null) {
      this.profileService.getProfileDataUser(user.username).subscribe(res => {
       
        this.profile = res[0];
        this.profile.cpassword = res[0].password;
        console.log(this.profile);
      //  this.profileImage = this.profileImage + "/" + this.profile.image;
        this.tempurl = this.tempurl+ this.profile.image;
    });
    }



  }

  getClientData() {
    var user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.profileService.getProfileDataClient(user.username).subscribe(res => {
      this.profile = res[0];
      this.profile.cpassword = res[0].password;
      console.log(this.profile);
      this.profileImage = this.profileImage + "/" + this.profile.image;
    });
  }

  SaveProfileData(){
   
    var user = JSON.parse(sessionStorage.getItem('currentUser'));
    if(user.role=="user"){
      this.profileService.saveProfileDataUser(this.profile).subscribe(res=>{
        if(res.Error = undefined){
          alert(res.Message);
          this.router.onSameUrlNavigation = "reload";
        }
        else{
          alert(res.Error);
        }
      });
    }
    else if(user.role == "client"){
        this.profileService.saveProfileDataClient(this.profile).subscribe(res=>{
          if(res.Error == undefined){
            alert(res.Message);
            this.router.onSameUrlNavigation = "reload";
          }
          else{
            alert(res.Error);
          }
        });
    }
  }

}
