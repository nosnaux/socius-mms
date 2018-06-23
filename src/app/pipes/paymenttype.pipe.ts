import { Pipe, PipeTransform } from '@angular/core';
/*
  PaymentTypeToFull - Returns an abbreviated payment type to full description
*/
@Pipe({name: "PaymentTypeToFull"})
export class PaymentTypeToFullPipe implements PipeTransform {
  transform(value: string) {
    var result = "";
    switch(value) {
      case "MN":
        result = "Monthly";
        break;
      case "HY":
        result = "Half Yearly";
        break;
      case "YR":
        result = "Yearly";
        break;
      default:
        break;
    }
    return result;
  }
}
