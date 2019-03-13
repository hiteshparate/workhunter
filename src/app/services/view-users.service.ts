import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Profile, UsersJoinJobs } from '../user';
import { Res } from '../response/res';

@Injectable({
  providedIn: 'root'
})
export class ViewUsersService {

  constructor(private http : HttpClient) { }
  viewUsersURL = "http://localhost:3000/viewUsersforClient";
  rateUserURL = "http://localhost:3000/rateUser";
  finalRatingURL = "http://localhost:3000/finalRatingToUser";

  ViewUsersforClient() : Observable<UsersJoinJobs[]>{
    var client = JSON.parse(sessionStorage.getItem('currentUser'));
    return this.http.post<UsersJoinJobs[]>(this.viewUsersURL , {
      client_id : client.id
    });
  }

  rateUser(user_id : number, job_id : number ) :Observable<Res>{
    return this.http.post<Res>(this.rateUserURL , {
      user_id : user_id,
      job_id : job_id,
      
    }) ;
  }

  finalRating(user_id : number , job_id : number , rate : number) : Observable<Res>{
    return this.http.post<Res>(this.finalRatingURL,{
      user_id : user_id,
      job_id : job_id,
      rate : rate
    });
  }
}
