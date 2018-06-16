import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { PaymentsService } from '../../services/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(private paymentService: PaymentsService, private memberService: MembersService) { }

  ngOnInit() {
    this.paymentService.getAllPayments();
  }

}
