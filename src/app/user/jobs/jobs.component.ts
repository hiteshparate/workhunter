import { Component, OnInit } from '@angular/core';
import { GetCategoryService } from 'src/app/services/get-category.service';
import { Category, jobs, applyJob } from 'src/app/category';
import { ApplyJobService } from 'src/app/services/apply-job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(private cat: GetCategoryService,
    private applyService: ApplyJobService) { }
  num = 1;
  category: Category[] = [];
  jobs: jobs[] = [];
  appliedjobs: applyJob[] = [];
  jtitle: string;
  jcategory: string;
  rating: number = 0;

  ngOnInit() {
    this.categories();
    this.alljobs();
    this.getApplieedJobs();

  }

  categories() {
    this.cat.getCategory().subscribe(data => {
      this.category = data;
      //  console.log(this.category[0].jcategory);

    });


  }

  alljobs() {
    this.cat.getJobs().subscribe(data => {
      this.jobs = data;
      // console.log(this.jobs[0].jdesc);
    });
  }

  searchedJobs(title: string, category: string) {
    this.jtitle = title;
    // console.log(this.jcategory + "from component");
    this.cat.findjobs(this.jtitle, this.jcategory).subscribe(data => {
      this.jobs = data;
    });
  }

  sendCategory(event: any) {
    this.jcategory = event.target.value;
    //  console.log(this.jcategory)
  }

  ApplyJob(job_id: number) {
    var user = JSON.parse(sessionStorage.getItem("currentUser"));
    var date = new Date();
    console.log("user_id" + user.id + " job_id " + job_id);
    this.applyService.ApplyJob(job_id, user.id, date).subscribe(data => {
      Swal.fire('success', 'Applied Successfully', 'success');
      this.ngOnInit();

    });

  }


  user = JSON.parse(sessionStorage.getItem("currentUser"));

  getApplieedJobs() {
    this.applyService.getAppliedjobs(this.user.id).subscribe(res => {
      this.appliedjobs = res;
      // console.log(this.appliedjobs);
    });
  }

  getJobStatus(job_id: number): string {
    //  this.getApplieedJobs();
    var temp = this.appliedjobs.find(c => c.job_id == job_id);
    if (temp == undefined)
      return "";
    else
      return temp.status;

  }

  rateCLient(job_id: number) {
    var user_id = this.user.id;
    this.applyService.rateClient(user_id, job_id, this.rating).subscribe(res => {
      if (res.Error == undefined) {
        Swal.fire('success', 'Rating Complete', 'success');
      }
      else {
        Swal.fire('error', 'something wong happened', 'error');
      }
    });
  }


  getRatingStatus(job_id: number): number {
    var user_id = this.user.id;
    var res: applyJob;
    this.applyService.getRatingStatus(user_id, job_id).subscribe(data => {
      res = data;
    });
    if (res != undefined){
        console.log(res.client_rating);
      return res.client_rating;

    }
    else{
      return 0;

    }
  }
}
