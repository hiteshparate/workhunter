import { Component, OnInit } from '@angular/core';
import { ViewUsersService } from 'src/app/services/view-users.service';
import { UsersJoinJobs } from 'src/app/user';
import { AddJobService } from 'src/app/services/add-job.service';
import Swal from 'sweetalert2';
  
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  constructor(private viewUserService: ViewUsersService, private addJobService: AddJobService) { }
  user: UsersJoinJobs[];
   finalRate : number;

  ngOnInit() {
    this.viewUserService.ViewUsersforClient().subscribe(res => {
      this.user = res;

    //  console.log(this.user);
    });
  }

  showUserData(username: string) {
    var data = (this.user.find(c => c.username == username));
      Swal.fire("username : " + data.username + "\n" + "email : " + data.email + "\n"
      + "first Name : " + data.fname + "\n" + "Middle Name : " + data.mname + "\n" + "Last Name : " + data.lname + "\n")

  }

  SelectUser(user_id: number, job_id: number) {
    var data = this.addJobService.selectUser(user_id, job_id).subscribe(res => {
      if (res.Error == undefined) {
        alert("User Selected for this Project");
        this.ngOnInit();
      }

    });
  }

  rateUser(user_id: number, job_id: number) {
    var data = this.viewUserService.rateUser(user_id, job_id).subscribe(res => {
      if (res.Error == undefined) {
        Swal.fire("Success" , "Project is completed" ,"success");
        this.ngOnInit();

      }
    });
  }

  finalRating(user_id : number , job_id : number, user_rating : number){
  //  console.log("Rating" + this.finalRate );
    this.viewUserService.finalRating(user_id,job_id,user_rating).subscribe(data=>{
      if(data.Error == undefined){
        Swal.fire("Success" ,"Rating Completed successfully" , "success");
        
      }
      else{
        Swal.fire("Error","Somthing Wrong Happened" , 'error');
      }
    });
  }

}
