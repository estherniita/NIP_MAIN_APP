import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchdateReceived'
})
export class SearchDateReceivedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      let rVal = val.date_received.search(new RegExp(args, 'i')) !== -1;
return rVal;
    });
  }
}