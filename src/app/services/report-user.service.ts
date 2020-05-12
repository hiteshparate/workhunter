import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../user';
import { Res } from '../response/res';
import { Feedback } from '../rating';

@Injectable({
  providedIn: 'root'
})
export class ReportUserService {

  constructor(private http : HttpClient) { }

  reportUsersURL  = "http://localhost:3000/reportUser";
  showAllUsersURL  = "http://localhost:3000/ShowAllUsers";
  showButtonURL  = "http://localhost:3000/showButtonURL";
  finalRatingtoUserURL = "http://localhost:3000/RatingToUserFinal";

  ShowAllUsers() : Observable<Profile[]>{
    return this.http.get<Profile[]>(this.showAllUsersURL);
  }

  ReportUser(user_id : number , client_id : number): Observable<Res>{
      return this.http.post<Res>(this.reportUsersURL,{
        user_id : user_id,
        client_id : client_id
      });
  }

  showReportButton() : Observable<Feedback[]>{
    return this.http.get<Feedback[]>(this.showButtonURL);
  }

  RetingtoUserFinal(user_id : number , client_id : number , rating : number) : Observable<Res>{
    return this.http.post<Res>(this.finalRatingtoUserURL , {
      user_id : user_id,
      client_id : client_id,
      rating : rating
    });
  }
}
