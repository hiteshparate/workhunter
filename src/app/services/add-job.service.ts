import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jobs } from '../category';
import { Res } from '../response/res';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddJobService {

  constructor(private http : HttpClient) { }
  url = "http://localhost:3000/addjob";
  selectUserURL = "http://localhost:3000/selectUser";
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  
  Add_job(job : jobs ) : Observable<Res>{
    var data = this.http.post<Res>(this.url, {
      title : job.title,
      category : job.category,
      description : job.description,
      postedby : job.postedby,
      price : job.price,
      posteddate : job.posteddate,
      client_id : this.user.id
    });
    return data;
  }

  selectUser(user_id : number , job_id : number) : Observable<Res>{
    var data  = this.http.post<Res>(this.selectUserURL,{
      user_id: user_id,
      job_id : job_id
    });
    console.log("From select USer Service " + data);
    return data;
  }
}
