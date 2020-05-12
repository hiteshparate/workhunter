import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Profile } from '../user';
import { Observable } from 'rxjs';
import { Res } from '../response/res';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor(private http: HttpClient) { }
  userurl = "http://localhost:3000/signinuser";
  clienturl = "http://localhost:3000/signinclient";
  forgotPasswordclienturl = "http://localhost:3000/sendMailforClient";
  forgotPasswordUserurl = "http://localhost:3000/sendMailforUser";

   generateString() : string{
    var char1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var char4 = "abcdefghijklmnopqrstuvwxyz";
    var char2 = "0123456789";
    var char3 = "!@";
    var password = "";
      for(var c=0 ; c < 2 ; c++){
        var i = Math.floor(Math.random() * char1.length);
          password += char1.charAt(i);
      }
      for(var c=0 ; c < 2 ; c++){
        var i = Math.floor(Math.random() * char4.length);
          password += char4.charAt(i);
      }

      

      for(var c=0 ; c < 1 ; c++){
        var i = Math.floor(Math.random() * char3.length);
          password += char3.charAt(i);
      }

      for(var c=0 ; c < 3 ; c++){
        var i = Math.floor(Math.random() * char2.length);
          password += char2.charAt(i);
      }

      return password;
  }

  public loginuser(user : User) : Observable<Profile>{
    var data = this.http.post<Profile>(this.userurl ,
      {
        username : user.username,
        password : user.password
      } );
      
    return data;
  }

  public loginclient(user : User) : Observable<Profile>{
    var data = this.http.post<Profile>(this.clienturl ,
      {
        username : user.username,
        password : user.password
      } );
      
    return data;
  }

  public forgotPasswordClient(email : string) : Observable<Res>{
    var password = this.generateString();
    var data = this.http.post<Res>(this.forgotPasswordclienturl ,{
      email : email,
      password : password,
    })
    return data;
  }

  public forgotPasswordUser(email : string) : Observable<Res>{
    var password = this.generateString();
    var data = this.http.post<Res>(this.forgotPasswordUserurl ,{
      email : email,
      password : password,
    })
    return data;
  }
}
