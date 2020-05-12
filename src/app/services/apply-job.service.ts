import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import { applyJob } from '../category';
import { Res } from '../response/res';

@Injectable({
  providedIn: 'root'
})
export class ApplyJobService  {

  constructor(private http : HttpClient) { }
  url = "http://localhost:3000/applyforjob";
  applyJobUrl = "http://localhost:3000/getAppliedJobs"; 
  RateClientUrl = "http://localhost:3000/rateClient"; 
  getRatingUrl = "http://localhost:3000/getClient_Rating"; 

  ApplyJob(job_id : number , user_id : number , date : Date) : Observable<applyJob>{
    var data = this.http.post<applyJob>(this.url , {
      job_id : job_id , 
      user_id : user_id,
      applieddate : date,
      status : "applied"
    });
    console.log("From service" + data);
    return data;
  }

 getAppliedjobs(user_id : string): Observable<applyJob[]>{
  var data = this.http.post<applyJob[]>(this.applyJobUrl ,{
  user_id : user_id,    
  });
  return data;
}
  
  rateClient(user_id:number , job_id:number , rating:number):Observable<Res>{
    return this.http.post<Res>(this.RateClientUrl,{
    user_id : user_id,
    job_id : job_id ,
    rating :rating      
    });
  }
 
  getRatingStatus(user_id : number , job_id : number): Observable<applyJob>{
    var data =  this.http.post<applyJob>(this.getRatingUrl , {
      user_id : user_id,
      job_id : job_id
    });
    return data;
  }
}
