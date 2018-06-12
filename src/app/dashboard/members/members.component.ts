import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private membersService: MembersService) { }

  ngOnInit() {
    this.membersService.getMembers();
    this.membersService.getMember(1);
  }

}
