import { Pipe, PipeTransform } from '@angular/core';
/*
*   Returns the full description of membership type
*/
@Pipe({name: 'FullMemberType'})
export class FullMemberTypePipe implements PipeTransform {
  transform(value: string): string {
    var result = "";
    switch(value.toUpperCase()) {
      case 'EM':
        result = "Employee";
        break;
      case 'ST':
        result = "Student";
        break;
      case 'GP':
        result = "General Public";
        break;
      default:
        result = "Error Type";
        break;
    }
    return result;
  }
}
