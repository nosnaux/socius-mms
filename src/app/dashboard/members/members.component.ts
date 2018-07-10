import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MembersService } from '../../services/members.service';
import { Member } from '../../services/members.service';
import * as $ from 'jquery';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit {
  members: Member[] = [];
  memberForm: FormGroup;
  regFormSettings = { membershipTypes: environment.membershipSettings };

  constructor(private membersService: MembersService, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    this.membersService.getMemberList().subscribe(data => {
      if(data != null) {
        //Process whether a single/multiple item(s)
        if(data['members']) {
          this.members = data['members'];
        } else {
          this.members.push(data['member']);
        }
      }
    });
  }


  public buildForm() {
    this.memberForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z \-]*')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z \-]*')]],
      prefname: '',
      gender: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      address: this.formBuilder.group({
        main: ['', Validators.required],
        suburb: ['', Validators.required],
        postcode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
        state: ['', Validators.required]
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('04[0-9]*')]],
      membertype: ['', Validators.required]
    });
  }

  /**
  * @name submitRegForm()
  * @desc Submits the current user inputted data to the database
  *       on a 200 result code, we will add the member to the table.
  *       Additionally, the form will be cleared, ready for the next
  *       registration.
  */
  public submitRegForm(): void {
    this.membersService.declareNewMember(this.memberForm.value).subscribe(data => {
      if(data['result']['code'] === 200) this.members.push(data["member"]);
    });
    this.buildForm();
  }

}
