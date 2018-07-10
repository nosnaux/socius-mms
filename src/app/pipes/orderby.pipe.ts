import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
  transform(array: Array<string>, args: string) {
    array.sort((a: any, b: any) => {
      if(a.firstname < b.firstname) {
        return -1;
      } else if(a > b) {
        return 0;
      } else {
        return 1;
      }
    });
    return array;
  }
}
