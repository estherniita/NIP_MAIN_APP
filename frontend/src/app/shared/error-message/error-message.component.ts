import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit, OnDestroy {

  @Input() obs?: Observable<string>;
  @Input() timeout: number = 6000;
  @Input() noMargin: boolean = false;

  message?: string;
  errorTimer?: Subscription;
  observableSubscription?: Subscription;

  constructor() { }

  ngOnInit(): void {

    this.observableSubscription = this.obs?.subscribe((msg: string) => {
      this.message = msg;

      this.startTimer();
    });
  }

  //funtion to set timer before error disappear
  startTimer() {
    if (this.errorTimer) this.errorTimer.unsubscribe();

    this.errorTimer = interval(this.timeout)
      .pipe(first())
      .subscribe(() => (this.message = ''));
  }

  //destroying the subscription
  ngOnDestroy(): void {
    if (this.observableSubscription) this.observableSubscription.unsubscribe();
    if (this.errorTimer) this.errorTimer.unsubscribe();
  }

}
