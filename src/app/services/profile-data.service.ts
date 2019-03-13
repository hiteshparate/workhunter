import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Profile } from '../user';
import { Observable } from 'rxjs';
import { Res } from '../response/res';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  constructor(private http: HttpClient) { }
  url2 = "http://localhost:3000/getProfileDataClient";
  url = "http://localhost:3000/getProfileDataUser";
  Userurl = "http://localhost:3000/saveProfileDataUser";
  Clienturl = "http://localhost:3000/saveProfileDataClient";
  postimageURLclient = "http://localhost:3000/postImageURLclient"
  postimageURLuser = "http://localhost:3000/postImageURLuser"
  
  public getProfileDataUser(username:string ): Observable<Profile>{
    console.log(username);
    var Data = this.http.post<Profile>(this.url,{
      username
    });
    console.log("from service" );
    return Data;

  }

  public getProfileDataClient(username:string ): Observable<Profile> {
    console.log(username);
    var Data = this.http.post<Profile>(this.url2,{
      username
    });
    
    return Data;

  }

  public saveProfileDataUser(profile : Profile) : Observable<Res>{
    var data = this.http.post<Res>(this.Userurl,{
      username : profile.username,
      password : profile.password,
      address : profile.address,
      email : profile.email,
      fname : profile.fname,
      mname : profile.mname,
      lname : profile.lname,
      country : profile.country,

    });

    return data;
  }

  public saveProfileDataClient(profile : Profile) : Observable<Res>{
    var data = this.http.post<Res>(this.Clienturl,{
      username : profile.username,
      password : profile.password,
      address : profile.address,
      email : profile.email,
      fname : profile.fname,
      mname : profile.mname,
      lname : profile.lname,
      country : profile.country,

    });

    return data;
  }

  public postimage(user_id : number ,  role : string  , imageurl : string  ) : Observable<Res>{
    if(role == 'user'){
      return this.http.post<Res>(this.postimageURLuser , {
        user_id : user_id,
        imageurl : imageurl,
      });
    }
    else{
      return this.http.post<Res>(this.postimageURLclient , {
        user_id : user_id,
        imageurl : imageurl,
      });
    }

  }

  
}
