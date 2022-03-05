import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  id: any;

  constructor(private auth: UserAuthService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(custId => {
      this.id = custId;

      this.auth.accountActivation(this.id)
      .subscribe(data=>{
        console.log("This message from sever")
      })
  })
  }



}
