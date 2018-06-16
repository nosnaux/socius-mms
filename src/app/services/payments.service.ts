import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private _http: HttpClient) { }

  public getAllPayments() {
    this._http.get("/api/payments/read.php?action=all").subscribe((res: any) => {
      console.log(res);
    })
  }

}
