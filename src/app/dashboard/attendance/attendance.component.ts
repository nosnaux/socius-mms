import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { Member } from '../../services/members.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  members: Member[] = [];
  attendees: Member[] = [];

  selectedDate: string = "";

  constructor(private memberService: MembersService) { }

  ngOnInit() {
    this.memberService.getMemberList().subscribe(data => {
      if(data != null) {
        if(data['members']) {
          this.members = data['members'];
        } else {
          this.members.push(data['member']);
        }
      }
      this.markedAttendance();
    });
  }

  public markedAttendance() {
    var string = "10,14".split(",");
    if(string.length > 1) {
      for(var i = 0; i < string.length; i++) {
        this.markAttendance((string[i]));
      }
    }
  }

  public markAttendance(aID: string) {
    var member = (this.members).find(c => c.id === aID);
    this.members.splice((this.members).indexOf(member), 1);
    this.attendees.push(member);
  }

  public releaseAttendance(aID: string) {
    var member = (this.attendees).find(c => c.id === aID);
    this.members.push(member);
    this.attendees.splice((this.attendees).indexOf(member), 1);
  }

  public saveAttendance() {
    var idOfAttendees = [];
    for(var i = 0; i < this.attendees.length; i++) {
      idOfAttendees.push((this.attendees[i].id));
    }
    console.log(JSON.stringify(idOfAttendees.sort()));
  }

}
