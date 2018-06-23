import { Pipe, PipeTransform } from '@angular/core';
/*
*   Returns a string capcatlized. Any spaces in string
*   will be considered.
*/
@Pipe({name: 'capatalize'})
export class CapatalizePipe implements PipeTransform {
  transform(value: string): string {
    var stringArray = value.split(/[\s\-]/);
    var result = "";
    for(var i = 0; i < stringArray.length; i++) {
      result += stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1).toLowerCase();
      if(!(i == (stringArray.length - 1))) result += " ";
    }
    return result;
  }
}
