import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCompany'
})
export class SearchCompanyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      let rVal = val.company.search(new RegExp(args, 'i')) !== -1;
return rVal;
    });
  }
}