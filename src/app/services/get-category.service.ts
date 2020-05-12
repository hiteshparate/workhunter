import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, jobs } from '../category';

@Injectable({
  providedIn: 'root'
})
export class GetCategoryService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/getcategory";
  url1 = "http://localhost:3000/alljobs";
  url2 = "http://localhost:3000/searchjob";

  public getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  public getJobs(): Observable<jobs[]> {
    return this.http.get<jobs[]>(this.url1);
  }

  public findjobs(jobstitle: string, jobcategory: string): Observable<jobs[]> {
    // console.log(jobcategory + "from service");
    return this.http.post<jobs[]>(this.url2, {
      title: jobstitle,
      category: jobcategory,
    });
  }


}
