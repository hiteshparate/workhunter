import { Component, OnInit, ElementRef } from '@angular/core';
import { Profile } from 'src/app/user';
import { ReportUserService } from 'src/app/services/report-user.service';
import Swal from 'sweetalert2';
import { Feedback } from 'src/app/rating';
import { RatingModule, Rating } from 'ngx-rating';

@Component({
  selector: 'app-report-users',
  templateUrl: './report-users.component.html',
  styleUrls: ['./report-users.component.css']
})
export class ReportUsersComponent implements OnInit {

  constructor(private reporUserService: ReportUserService) {
    this.showAllFeedback();
  }
  users: Profile[] = [];
  rating : number ;

  showAllFeedback() {
    this.reporUserService.showReportButton().subscribe(data => {
      this.feedback = data;
    });
  }

  ngOnInit() {
    this.showAllFeedback();
    this.reporUserService.ShowAllUsers().subscribe(data => {
      this.users = data;
    });
    console.log(this.feedback);
  }
  feedback: Feedback[] = [];


  showButton(user_id: number) {
    var client = JSON.parse(sessionStorage.getItem('currentUser'));
    var f = this.feedback.find(x => x.user_id == user_id && x.client_id == client.id);
    if (f == undefined) {
      return true;
    }
    else if (f.clientToUserReport == 1) {
      return false;
    }
    else {
      return true;
    }
  }

  showRateButton(user_id: number) {
    var client = JSON.parse(sessionStorage.getItem('currentUser'));
    var f = this.feedback.find(x => x.user_id == user_id && x.client_id == client.id);
    if (f == undefined) {
      return true;
    }
    else if (f.clientToUserRating > 0) {
      return false;
    }
    else {
      return true;
    }
  }

  ReportUser(user_id: number) {
    var client = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(client.id);
    this.reporUserService.ReportUser(user_id, client.id).subscribe(es => {
      if (es.Error == undefined) {
        Swal.fire('success', es.Message, 'success');
        this.ngOnInit();
      }
      else {
        Swal.fire('error', es.Error, 'error');
      }
    });
  }

  ShowRating(user_id : number):number{
    var client = JSON.parse(sessionStorage.getItem('currentUser'));
    var f = this.feedback.find(x => x.user_id == user_id && x.client_id == client.id);
    if(f==undefined)
    return 0;
    else
    return f.clientToUserRating;
  }

  ratingToUser(rating : Rating , user_id : number ){
     var rate = rating.model;
     var client = JSON.parse(sessionStorage.getItem('currentUser'));
   this.reporUserService.RetingtoUserFinal(user_id,client.id , rate).subscribe(data => {
     if(data.Error == undefined){
       Swal.fire('success' , data.Message , 'success');
       this.ngOnInit();
     }
     else{
       Swal.fire('error' , data.Error , 'error');
     }
   }) 
  }
}
