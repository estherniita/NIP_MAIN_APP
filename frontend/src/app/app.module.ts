import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { BiddersForgotPasswordComponent } from './components/bidders-forgot-password/bidders-forgot-password.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ReadAllButtonComponent } from './shared/read-all-button/read-all-button.component';
import { QuickLinksComponent } from './shared/quick-links/quick-links.component';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { ButtonLoaderComponent } from './shared/button-loader/button-loader.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { MediaCentreComponent } from './components/media-centre/media-centre.component';
import { PageIntroComponent } from './shared/page-intro/page-intro.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { IntroSectionComponent } from './shared/intro-section/intro-section.component';
import { AvailableInternshipsComponent } from './components/available-internships/available-internships.component';
import { FaqComponent } from './components/faq/faq.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { SearchUsernamePipe } from './pipes/search-username.pipe';
import { SearchCompanyPipe } from './pipes/search-company.pipe';
import {SearchDateReceivedPipe} from './pipes/search-date_recevied.pipe';
import { SearchInstitutionPipe } from './pipes/search-institution.pipe';
import { SentInternshipsToInstitutionsComponent } from './components/sent-internships-to-institutions/sent-internships-to-institutions.component';
import { CompaniesInstitutionsReportsComponent } from './components/companies-institutions-reports/companies-institutions-reports.component';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { CompanyInternshipPostComponent } from './components/company-internship-post/company-internship-post.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { NotLoggedInComponent } from './components/sign-in/notLoggedIn.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InstitutionDashboardComponent } from './components/institution-dashboard/institution-dashboard.component';
import { InstitutionReceivedInternshipsComponent } from './components/institution-received-internships/institution-received-internships.component';
import { StudentsComponent } from './components/students/students.component';
import { InstitutionReportsComponent } from './components/institution-reports/institution-reports.component';
import { InstitutionStudentsComponent } from './components/institution-students/institution-students.component';
import { InstitutionStudentsListComponent } from './components/institution-students-list/institution-students-list.component';
import { SendInternshipsToInstitutionsComponent } from './components/send-internships-to-institutions/send-internships-to-institutions.component';
import { CompanyStudentListComponent } from './components/company-student-list/company-student-list.component';
import { CompanyUpdateStudentComponent } from './components/company-update-student/company-update-student.component';
import { CompanyAdmittedComplettedStudentComponent } from './components/company-admitted-completted-student/company-admitted-completted-student.component';
import { ReCaptchaModule } from 'angular-recaptcha3';
import { NgxCaptchaModule } from "ngx-captcha";
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    BiddersForgotPasswordComponent,
    LoaderComponent,
    ReadAllButtonComponent,
    QuickLinksComponent,
    ScrollToTopComponent,
    ErrorMessageComponent,
    RegisterSuccessComponent,
    AdminLoginComponent,
    ButtonLoaderComponent,
    EmailVerificationComponent,
    MediaCentreComponent,
    PageIntroComponent,
    SignInComponent,
    SignUpComponent,
    AboutUsComponent,
    IntroSectionComponent,
    AvailableInternshipsComponent,
    FaqComponent,
    AdminDashboardComponent,
    StudentsListComponent,
    SearchUsernamePipe,
    SearchCompanyPipe,
    SearchDateReceivedPipe,
    SearchInstitutionPipe,
    SentInternshipsToInstitutionsComponent,
    CompaniesInstitutionsReportsComponent,
    CompanyDashboardComponent,
    CompanyInternshipPostComponent,
    UserManagementComponent,
    RegisterAdminComponent,
    NotLoggedInComponent,
    ConfirmDeleteComponent,
    InstitutionDashboardComponent,
    InstitutionReceivedInternshipsComponent,
    StudentsComponent,
    InstitutionReportsComponent,
    InstitutionStudentsComponent,
    InstitutionStudentsListComponent,
    SendInternshipsToInstitutionsComponent,
    CompanyStudentListComponent,
    CompanyUpdateStudentComponent,
    CompanyAdmittedComplettedStudentComponent,
  



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    RecaptchaModule,
    RecaptchaV3Module,
    NgxCaptchaModule,
    RecaptchaFormsModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => {
    //       return localStorage.getItem('access_token');
    //     },
    //     allowedDomains: ['http://mtcuatnip.mtcdc.com.na:3000'],
    //     disallowedRoutes: []
    //   }
    // })

    ReCaptchaModule.forRoot({
      invisible: {
          sitekey: '6LcPk74eAAAAALx7eJez8wDT_d3i5E7NXX5FbZnr', 
      },
      normal: {
          sitekey: '6LcPk74eAAAAALx7eJez8wDT_d3i5E7NXX5FbZnr', 
      },
      language: 'en'
  }),
  ],
  providers: [
    NgbActiveModal,
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcPk74eAAAAALx7eJez8wDT_d3i5E7NXX5FbZnr' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
