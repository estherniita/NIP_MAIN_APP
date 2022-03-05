import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchInstitution'
})
export class SearchInstitutionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      let rVal = val.institution.search(new RegExp(args, 'i')) !== -1;
return rVal;
    });
  }
}