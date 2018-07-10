import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

import { MembersService } from '../../services/members.service';
import { environment } from '../../../environments/environment';
import { PaymentsService } from '../../services/payments.service';
import { Payment } from '../../services/payments.service';
import { Member } from '../../services/members.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  payments: Payment[] = [];
  members: Member[] = [];

  selectedPayment: Payment;

  paymentForm: FormGroup;

  newPayment = {};
  paymentSettings = environment.paymentSettings;

  constructor(private paymentService: PaymentsService, private memberService: MembersService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getMembers();
    this.getPayments();
    this.buildForm();
  }

  public getPayments(): void {
    this.paymentService.getPaymentList().subscribe(data => {
      if(data !== null) {
        if(!data["payments"]) {
          this.payments.push(data["payment"]);
        } else {
          this.payments = data["payments"];
        }
      }
    });
  }

  public getMembers(): void {
    this.memberService.getMemberList().subscribe(data => {
      if(data !== null) {
        if(!data['members']) {
          this.members.push(data['member']);
        } else {
          this.members = data['members'];
        }
      }
    });
  }

  /**
  * @name getTodayDateInput()
  * @param selector A object property
  * @desc Sets a bject property element value to the current date in YYYY-MM-DD format
  */
  public getTodayDateInput(selector) {
    if(selector === "for") {
      this.paymentForm.patchValue({for: moment().format("YYYY-MM-DD")});
    } else if(selector === "rec") {
      this.paymentForm.patchValue({recdate: moment().format("YYYY-MM-DD")});
    }
  }


  /**
  *  @name getNextDueFromMember()
  *  @param aID An integer representing a members id
  *  @desc Searches through the members array, and retrieves the latest due date for a member of id aID
  */
  public getNextDueFromMember(aID) {
    this.paymentForm.patchValue({
      for: (this.members.find(c => c.id === aID).nextdue)
    });
  }


  /**
  * @name paymentTypeSelected()
  * @param aCode A string representing a payment type
  * @desc This function removes the neccesity to manually input a payment amount, if there is a
  *       pattern in all payments. Of course, admins are free to edit the form as desired.
  */
  public paymentTypeSelected(aCode) {
    this.paymentForm.patchValue({
      paidamount: (this.paymentSettings.find(c => c.short === aCode).value)
    });
  }


  public buildForm() {
    this.paymentForm = this.formBuilder.group({
      receiptid: ['', Validators.required],
      member: ['', Validators.required],
      recdate: ['', Validators.required],
      type: ['', Validators.required],
      paidamount: ['', Validators.required],
      for: ['', Validators.required]
    });
  }

  public selectPayment(payment: Payment) {
    this.selectedPayment = payment;
  }

  /**
  * @name submitPaymentForm()
  * @desc Submits the current user inputted data to the database.
  *       on a successfull reselt code (200), the new payment will
  *       be added onto the payments table, and cleared for the next
  *       payment.
  */
  public submitPaymentForm() {
    this.paymentService.declareNewPayment(this.paymentForm.value).subscribe(data => {
      if(data["result"]["code"] === 200) {
        this.getPayments();
        this.getMembers();
      }
    });
    this.buildForm();
  }

}
