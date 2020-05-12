import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/register';
import { RegistrationService } from 'src/app/services/registration.service';
import { Res } from 'src/app/response/res';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  show_otp = false;
  hide_form = true;
  register: Register = new Register();
  constructor(private regserv: RegistrationService, private router: Router) { }

  ngOnInit() {
  }

  res: Res = new Res();

  otp_click() {
    this.show_otp = true;
    this.hide_form = false;

    // registration for client
    if (this.client_flag == true) {
      this.regserv.registrationclient(this.register).subscribe(res => {
        // console.log(this.register);
        //this.res = res;
        if (res.Error == undefined) {
          Swal.fire('success' , res.Message ,'success');
          this.router.navigateByUrl("/home");
        }
        else {
          console.log(res.Error);
          Swal.fire('error' , res.Error , 'error');
        }
      });
    }

    // registration for user
    if (this.user_flag == true) {
      this.regserv.registrationuser(this.register).subscribe(res => {
         //console.log(this.res.Error + " " + this.res.Message);
       // this.res = res;
        if (res.Error == undefined) {
          Swal.fire('success' ,res.Message , 'success');
          this.router.navigateByUrl("/home");
        }
        else {
          Swal.fire('errror' ,res.Error , 'error');
        }
      });
    }
  }

  btn_flag = true;
  client_flag = false;
  user_flag = false;

  show_user() {
    this.client_flag = false;
    this.user_flag = true;
    this.btn_flag = false;
  }
  show_client() {
    this.client_flag = true;
    this.user_flag = false;
    this.btn_flag = false;
  }
  reset() {
    this.client_flag = false;
    this.user_flag = false;
    this.btn_flag = true;
  }
}
