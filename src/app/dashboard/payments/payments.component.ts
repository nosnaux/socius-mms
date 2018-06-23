import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { Payment } from '../../services/payments.service';
import { PaymentsService } from '../../services/payments.service';
import * as moment from 'moment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  payments: Payment[] = [];

  constructor(private paymentService: PaymentsService, private memberService: MembersService) { }

  ngOnInit() {
    this.paymentService.getAllPayments().subscribe(data => {
      this.payments = data["payments"];
    });
  }

  public getTodayDateInput(selector) {
    var input = (<HTMLInputElement>document.getElementById(selector)).value = moment().format("YYYY-MM-DD");
  }


}
