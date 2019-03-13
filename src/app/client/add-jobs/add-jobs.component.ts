import { Component, OnInit } from '@angular/core';
import { jobs } from 'src/app/category';
import { AddJobService } from 'src/app/services/add-job.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent implements OnInit {

  constructor(private addJob : AddJobService, private router : Router) { }

  job : jobs ;

  ngOnInit() {
    this.job = new jobs();
  }

  AddJob(){
    this.job.posteddate = new Date();
    this.addJob.Add_job(this.job).subscribe(data => {
      if(data.Error == undefined){
        alert("job Added successfully");
this.router.navigateByUrl("/client_home");
      }
      else{
        alert(data.Error);
      }
    });
  }

}
