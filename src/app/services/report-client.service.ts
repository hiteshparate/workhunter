import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../user';
import { Res } from '../response/res';

@Injectable({
  providedIn: 'root'
})
export class ReportClientService {

  constructor(private http : HttpClient) { }
  showCLientsURL = "http://localhost:3000/ShowAllClients ";
  ReportCLientsURL = "http://localhost:3000/ReportClient ";
  RateCLientsURL = "http://localhost:3000/ratingClientFinal";

  ShowUsers() : Observable<Profile[]>{
    return this.http.get<Profile[]>(this.showCLientsURL);
  }

  ReportClient(user_id : number, client_id : number) : Observable<Res>{
   return this.http.post<Res>(this.ReportCLientsURL , {
      user_id : user_id,
      client_id : client_id 
    });
  }

  RateClient(user_id : number  , client_id : number , rating :number)  : Observable<Res>{
    return this.http.post<Res>(this.RateCLientsURL , {
      user_id : user_id , 
      client_id : client_id,
      rating : rating
    });
  }
}
