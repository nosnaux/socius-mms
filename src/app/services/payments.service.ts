import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

export interface Payment {
  receiptid: string,
  member: string,
  paymentamount: number,
  recieveddate: string,
  paymentfor: string,
  paymenttype: string,
  nextdue: string
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private _http: HttpClient, private toastr: ToastrService) { }


  public processPayment(aPayment: Payment): void {
    switch(aPayment["paymenttype"]) {
      case "MN":
        aPayment["nextdue"] = moment(aPayment["paymentfor"]).add(4, "weeks").format("YYYY-MM-DD");
        break;
      case "HY":
        aPayment["nextdue"] = moment(aPayment["paymentfor"]).add(6, "months").format("YYYY-MM-DD");
        break;
      case "YR":
        aPayment["nextdue"] = moment(aPayment["paymentfor"]).add(1, "years").format("YYYY-MM-DD");
        break;
      default:
        break;
    }
  }

  public getAllPayments() {
    return this._http.get("/api/payments.php").pipe(map(res => {
      if(res["result"]["code"] === 200) {
        for(var i = 0; i < res["payments"].length; i++) {
          this.processPayment(res["payments"][i]);
        }
        return res;
      } else {
        this.toastr.error(res["result"]["message"], '', {positionClass: 'toast-top-full-width'});
      }
    }));
  }

}
