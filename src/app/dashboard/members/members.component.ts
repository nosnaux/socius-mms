import { Component, OnInit } from '@angular/core';
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
  newMember = {};
  regFormSettings = {
    membershipTypes: environment.membershipSettings
  };

  constructor(private membersService: MembersService) { }

  ngOnInit() {
    this.membersService.getMemberList().subscribe(data => {
      if(data != null) {
        this.members = data['members'];
      }
    });
  }

  public submitRegForm(): void {
    this.membersService.declareNewMember(this.newMember).subscribe(data => {
      this.members.push(data["member"]);
    });
    this.newMember = {};
  }

}
