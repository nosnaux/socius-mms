import { Pipe, PipeTransform } from '@angular/core';
/*
*   Returns a string capcatlized. Any spaces in string
*   will be considered.
*/
@Pipe({name: 'capatalize'})
export class CapatalizePipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/(^|[\s-])\S/g, function(match) {
      return match.toUpperCase();
    })
  }
}
