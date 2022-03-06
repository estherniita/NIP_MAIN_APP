import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AboutUsComponent } from './components/about-us/about-us.component'; 
import { AvailableInternshipsComponent } from './components/available-internships/available-internships.component';
import { FaqComponent } from './components/faq/faq.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { SentInternshipsToInstitutionsComponent } from './components/sent-internships-to-institutions/sent-internships-to-institutions.component';
import { CompaniesInstitutionsReportsComponent } from './components/companies-institutions-reports/companies-institutions-reports.component';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { CompanyInternshipPostComponent } from './components/company-internship-post/company-internship-post.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import {SuperadminAuthGuardService as superAdminGuard} from './services/superadmin-auth-guard.service';
import {AdminAuthenticationService as AdminGuard} from './services/admin-authentication.service';


//general ccmponents
import { BiddersLoginComponent } from './components/bidders-login/bidders-login.component';
import { BiddersRegisterComponent } from './components/bidders-register/bidders-register.component';
import { BiddersForgotPasswordComponent } from './components/bidders-forgot-password/bidders-forgot-password.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { MediaCentreComponent } from './components/media-centre/media-centre.component';

//admin components
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { InstitutionDashboardComponent } from './components/institution-dashboard/institution-dashboard.component';
import { InstitutionReceivedInternshipsComponent } from './components/institution-received-internships/institution-received-internships.component';

import { StudentsComponent } from './components/students/students.component';
import { InstitutionStudentsListComponent } from './components/institution-students-list/institution-students-list.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { SendInternshipsToInstitutionsComponent } from './components/send-internships-to-institutions/send-internships-to-institutions.component';
import { CompanyStudentListComponent } from './components/company-student-list/company-student-list.component';
import { CompanyUpdateStudentComponent } from './components/company-update-student/company-update-student.component';


//defining our routes
const routes: Routes = [

  //default route to Landing page
  {
    path: "",
    component: LandingComponent,
    data: {
        title: "National Internship Program",
    },
},
//home route
{
  path: "home", component: LandingComponent

},
//login route
{
  path: "auth/signin", component: SignInComponent

},
//sign up route
{
  path: "auth/signup", component: SignUpComponent

},
//forgot password route
{
  path: "auth/forgot-password", component: BiddersForgotPasswordComponent

},
//successful register redirect route
{
  path: "auth/signup-success", component: RegisterSuccessComponent

},
//email verication success
{
  path: "auth/verification/:id", component: EmailVerificationComponent

},
//admin login page
{
  path: "auth/admin/signin", component: AdminLoginComponent

},
//about page
{
  path: "about-nip", component: AboutUsComponent

},
//available internships
{
  path: "internships", component: AvailableInternshipsComponent

},
//faq page
{
  path: "faq", component: FaqComponent
},
//admin page
{
  path: "admin-dashboard", component: AdminDashboardComponent, canActivate: [superAdminGuard]
},
//student list page
{
  path: "studentlist", component: StudentsListComponent, canActivate: [superAdminGuard]
},
//sent internships to institutions
{
  path: "institution-sent-internship", component: SentInternshipsToInstitutionsComponent, canActivate: [superAdminGuard]
},
//companies & institutions report
{
  path: "CompanyAndInstitutionsReport", component: CompaniesInstitutionsReportsComponent, canActivate: [AdminGuard]
},
//company dashboard
{
  path:'companies',  component:CompanyDashboardComponent, canActivate: [AdminGuard]
},
//company internship post page
{
  path:'companiesPost',  component:CompanyInternshipPostComponent, canActivate: [AdminGuard]
},
//user management page
{
  path: 'user-management', component: UserManagementComponent, canActivate: [superAdminGuard]
},

//institution dashboard page
{path: 'institutionDashboard', component:InstitutionDashboardComponent, canActivate: [AdminGuard]},

{path:'institutionReceivedInternships',  component: InstitutionReceivedInternshipsComponent, canActivate: [AdminGuard]},

{path:'students',  component: StudentsComponent, canActivate: [AdminGuard]},

{path: "InstitutionStudentsList", component: InstitutionStudentsListComponent, canActivate: [AdminGuard] },

{path: "registerAdmin", component: RegisterAdminComponent,  canActivate: [superAdminGuard]},

{path: "sendInternships", component: SendInternshipsToInstitutionsComponent, canActivate: [superAdminGuard]},

{
  path:'companystudentlist',  component:CompanyStudentListComponent, canActivate: [AdminGuard]
},

{
  path:'companyEditStudentDetails',  component:CompanyUpdateStudentComponent, canActivate: [AdminGuard]
},


];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
