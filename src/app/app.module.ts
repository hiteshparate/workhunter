import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient , HttpClientModule} from '@angular/common/http';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {RatingModule} from 'ngx-rating';

import { FileSelectDirective } from 'ng2-file-upload';
import {StorageServiceModule} from 'ngx-webstorage-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WorklistComponent } from './work/worklist/worklist.component';
import { ConfirmPasswordDirective } from './confirm-password.directive';
import { JobsComponent } from './user/jobs/jobs.component';
import {DataTablesModule} from 'angular-datatables';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { ProfileComponent } from './client/profile/profile.component';
import { AddJobsComponent } from './client/add-jobs/add-jobs.component';
import { ViewUsersComponent } from './client/view-users/view-users.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserJobsComponent } from './user/user-jobs/user-jobs.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ReportClientComponent } from './user/report-client/report-client.component';
import { ReportUsersComponent } from './client/report-users/report-users.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    WorklistComponent,
    ConfirmPasswordDirective,
    JobsComponent,
    PageNotFoundComponent,
    ClientHomeComponent,
    ProfileComponent,
    AddJobsComponent,
    ViewUsersComponent,
    UserHomeComponent,
    UserJobsComponent,
    FileSelectDirective,
    ForgotPasswordComponent,
    ReportClientComponent,
    ReportUsersComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    StorageServiceModule,
    NgxSmartModalModule.forRoot(),
    RatingModule,
    
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
