import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "usernameFilter"
})
export class SearchUsernamePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val:any) => {
      let rVal = val.username.search(new RegExp(args, 'i')) !== -1;
return rVal;
    });
  }
}