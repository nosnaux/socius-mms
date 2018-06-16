import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { Member } from '../../services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit {

  members: Member[] = [];

  constructor(private membersService: MembersService) { }

  ngOnInit() {
    this.membersService.getMemberList().subscribe(data => {
      if(data != null) {
        this.members = data['members'];
      }
    });
  }

}
