import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Res } from '../response/res';
import { Register } from '../register';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  // url ="http://localhost/projectapi/user/registration.php?method=POST"
  clienturl = "http://localhost:3000/signupclient"
  userurl = "http://localhost:3000/signupuser"
  constructor(private http: HttpClient) { }

  public registrationclient(user: Register): Observable<Res> {
    var data =  this.http.post<Res>(this.clienturl, {
      username: user.username,
      email: user.emailid,
      password: user.password

    });
    console.log(user.emailid);
    return data;
  }

  public registrationuser(user: Register): Observable<Res> {
    var data =  this.http.post<Res>(this.userurl, {
      username: user.username,
      email: user.emailid,
      password: user.password

    });
    console.log(user.emailid);
    return data;
  }
}
