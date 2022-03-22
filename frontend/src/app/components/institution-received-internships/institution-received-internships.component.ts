import { Component, OnInit } from '@angular/core';
import {InternshipsService} from '../../services/internships.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import {
  NgbActiveModal,
  NgbModalConfig
} from '@ng-bootstrap/ng-bootstrap';
import { UsersService} from '../../services/users.service';
import {ConfirmDeleteComponent} from  '../confirm-delete/confirm-delete.component';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";  
import {AdminAuthenticationService} from '../../services/admin-authentication.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-institution-received-internships',
  templateUrl: './institution-received-internships.component.html',
  styleUrls: ['./institution-received-internships.component.scss']
})
export class InstitutionReceivedInternshipsComponent implements OnInit {


  public Internships = [];
  // id: string;
  internship: any;
  username: any;
  search: any;
  data: any;
   internships = [];
  // showAlert: boolean;
  // title: string;

  constructor(private config: NgbModalConfig,   private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private activeModal: NgbActiveModal, private usersService: UsersService,  private modal: NgbModal,
    public internshipsService: InternshipsService,  public adminAuthenticationService: AdminAuthenticationService) { }

  ngOnInit(): void {

    document.title = "Institution received Interships"


    this.getAllInternships();
  }


  editRecord(data: any) {


    const datatosave = {
      sendStudent: true,
      data
    }

    //saving data in the local storage
    localStorage.setItem('INTERNSHIPdata', JSON.stringify(datatosave));


    //routing the admin to the registration component
    setTimeout(() => {
      this.router.navigate(['/students']);
    }, 500);
  }

  getAllInternships() {

    let user: any;

    user = JSON.parse(localStorage.getItem('userdata') || '{}');

    if (user.isLoggedin) {
      setTimeout(() => {

        

      switch (user.role) {

        case 'adminUNAM': { 
          this.internshipsService.UNAMreceived()
            .subscribe((result:any) => {
              // this.Users.push(result);
              result.data.forEach((val: any) => this.internships.push(val as never));
            });
      
            break;
          }
    

        case 'adminIUM': { 
    this.internshipsService.IUMreceived()
      .subscribe((result:any) => {
        // this.Users.push(result);
        result.data.forEach((val: any) => this.internships.push(val as never));
      });

      break;
    }


    case 'adminNUST': { 
      this.internshipsService.NUSTreceived()
        .subscribe((result:any) => {
          // this.Users.push(result);
          result.data.forEach((val: any) => this.internships.push(val as never));
        });
  
        break;
      }


    case 'adminNIMT': { 
        this.internshipsService.NIMTreceived()
          .subscribe((result:any) => {
            // this.Users.push(result);
            result.data.forEach((val: any) => this.internships.push(val as never));
          });
    
          break;
        }


    case 'adminVTC': { 
      
      this.internshipsService.VTCreceived()
        .subscribe((result:any) => {
          // this.Users.push(result);
          result.data.forEach((val: any) => this.internships.push(val as never));
        });
  
        break;
      }   

  }

});

}

  }



     //download method
     download(file_pdf: any){

    


      this.internshipsService.download(file_pdf).subscribe((data: any) => {
  
          saveAs(data, `Company Internship Document ${new Date().toLocaleDateString('en-GB')}.pdf`)
         
  
      });
  
    }


}
