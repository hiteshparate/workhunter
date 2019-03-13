import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './user/jobs/jobs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { ProfileComponent } from './client/profile/profile.component';
import { AddJobsComponent } from './client/add-jobs/add-jobs.component';
import { ViewUsersComponent } from './client/view-users/view-users.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ReportClientComponent } from './user/report-client/report-client.component';
import { ReportClientService } from './services/report-client.service';
import { ReportUsersComponent } from './client/report-users/report-users.component';

const routes: Routes = [
  {path:"" ,component:HomeComponent},
  {path : "login"  , component:LoginComponent},
  {path : "signup" , component:SignupComponent},
  {path : "about" , component:AboutComponent},
  {path : "contact" , component:ContactComponent},
  {path:"home",component:HomeComponent},
  {path : "jobs" , component : JobsComponent},
  {path: "client_home", component : ClientHomeComponent , children : [
    {path:"client_profile" , component : ProfileComponent},
  {path: "client_add_jobs", component : AddJobsComponent},
  {path: "client_view_users", component : ViewUsersComponent},
  {path: "report_users", component  : ReportUsersComponent}
  
  ]},
  {path : "user_home" , component : UserHomeComponent, children:[
    {path : "user_profile", component : ProfileComponent},
    {path : "apply_jobs", component : JobsComponent},
    {path : "report_client", component : ReportClientComponent},
    
  ]},
  {path : "login/forgot_password" , component : ForgotPasswordComponent},
   {path :"**" , component : PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{onSameUrlNavigation:'reload'}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
