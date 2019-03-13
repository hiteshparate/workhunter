import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }


  ngOnInit() {
  }



  btn_flag = true;
  client_flag = false;
  user_flag = false;
  user: User = new User();
  client_email: string;
  user_email: string;
  fpu: boolean;
  fpc: boolean;

  showForgotPasswordforUser() {
    this.fpu = true;
    this.loginService.generateString();
  }

  showForgotPasswordforClient() {
    this.fpc = true
  }

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
    this.fpu = false;
    this.fpc = false;
  }

  Login() {
    // console.log(this.user);
    //login for user
    if (this.user_flag == true) {
      this.loginService.loginuser(this.user).subscribe(
        res => {
          if (res[0] != undefined) {
            Swal.fire('Hi ' + res[0].username, "Logged in Successfully", 'info');
            if (this.user_flag == true)
              sessionStorage.setItem('currentUser', JSON.stringify({ username: this.user.username, role: "user", id: res[0].id }));
            this.router.navigateByUrl("/user_home");
             location.reload();

          }
          else {
           Swal.fire("error" , "UserName or Password is wrong" , 'error');
          }
        
        },error=>{
          if(error.name = "HttpErrorResponse")
          Swal.fire(error.name + " Server is not running" );
          else{
            Swal.fire('error' , " error.name + '' error.message", "error")
          }
        }
      );
    }

    if (this.client_flag == true) {
      this.loginService.loginclient(this.user).subscribe(
        res => {
          if (res[0] != undefined) {
            Swal.fire('Hi ' + res[0].username, "Logged in Successfully", 'info');

            if (this.client_flag == true) {
              sessionStorage.setItem('currentUser', JSON.stringify({ username: this.user.username, role: "client", id: res[0].id }));
              this.router.navigateByUrl("/client_home");
              location.reload();
            }
          }
          else {
            Swal.fire("error" , "UserName or Password is wrong" , 'error');

          }
        },error=>{
          if(error.name = "HttpErrorResponse")
          Swal.fire(error.name + " Server is not running" );
          else{
            Swal.fire('error' , " error.name + '' error.message", "error")
          }
        }
      );
    }

    //  this.user = new User();

  }

  forgotPassword() {
    if (this.user_flag == true) {
      this.loginService.forgotPasswordUser(this.user_email).subscribe(res => {
        if (res.Error != undefined) {
          Swal.fire('Error', res.Error, "error");
        }
        if (res.Message != undefined) {
          Swal.fire('success', "Mail Sent Succesfully", 'success');
          this.router.navigateByUrl("/home");
        }
      });
    }

    else if (this.client_flag == true) {
      this.loginService.forgotPasswordClient(this.client_email).subscribe(res => {
        if (res.Error != undefined) {
          Swal.fire('Error', res.Error, "error");
        }
        if (res.Message != undefined) {
          Swal.fire('success', "Mail Sent Succesfully", 'success');
          this.router.navigateByUrl("/home");
        }
      })
    }
  }

}
