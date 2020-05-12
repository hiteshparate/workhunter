import { Component, OnInit } from '@angular/core';
import { ReportClientService } from 'src/app/services/report-client.service';
import { Profile } from 'src/app/user';
import Swal from 'sweetalert2';
import { ReportUserService } from 'src/app/services/report-user.service';
import { Feedback } from 'src/app/rating';
import { Rating } from 'ngx-rating';

@Component({
  selector: 'app-report-client',
  templateUrl: './report-client.component.html',
  styleUrls: ['./report-client.component.css']
})
export class ReportClientComponent implements OnInit {

  constructor(private reportClientService : ReportClientService , private reportUserService : ReportUserService) { }
  clients : Profile[];
  feedback : Feedback[] = [];
  ngOnInit() {  
    this.reportClientService.ShowUsers().subscribe(data => {
      this.clients = data;
    });
    this.showAllFeedback();
  }

  ReportClient(client_id : number){
    var user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.reportClientService.ReportClient(user.id,client_id).subscribe(data=>{
      if(data.Error != undefined){
        Swal.fire("error" , data.Error , 'error');
      }
      else{
        Swal.fire('success' , data.Message , 'success');
        this.ngOnInit();
      }
    })
  }

  showAllFeedback(){
    this.reportUserService.showReportButton().subscribe(data=>{
      this.feedback = data;
    });
  }

  showReportButton(client_id : number) : boolean{
    var user = JSON.parse(sessionStorage.getItem('currentUser'));
    var temp = this.feedback.find(c => c.client_id == client_id && c.user_id == user.id);
    if(temp == undefined){
      return true;
    }
    else if(temp.userToClientReport == 1){
      return false;
    }
    else{
      return true;
    }
  }

  ShowRatingButton(client_id : number):number{
    var user = JSON.parse(sessionStorage.getItem('currentUser'));
    var f = this.feedback.find(x => x.user_id == user.id && x.client_id == client_id);
    if(f==undefined)
    return 0;
    else
    return f.userToClientRating;
  }


  showRateButton(client_id: number) {
    var user = JSON.parse(sessionStorage.getItem('currentUser'));
    var f = this.feedback.find(x => x.user_id == user.id && x.client_id == client_id);
    if (f == undefined) {
      return true;
    }
    else if (f.userToClientRating > 0) {
      return false;
    }
    else {
      return true;
    }
  }

  ratingToClient(rating : Rating , client_id : number){
    var rate = rating.model;
    console.log(client_id +" " + rate );
    var user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.reportClientService.RateClient(user.id ,client_id , rate).subscribe(data=>{
      if(data.Error == undefined){
        Swal.fire('success', data.Message , 'success');
        this.ngOnInit();
      }
      else{
        Swal.fire('error' , data.Error , 'error');
      }
    })
  }
}
