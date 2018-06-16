import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

export interface Member {
  id: number;
  title: string;
  firstname: string;
  lastname: string;
  prefname: string;
  regdate: string;
  membertype: string;
  address: string;
  email: string;
  contactnumber: string;
  gender: string;
  dateofbirth: string;
  lastpaymentdate: string;
  lastpaymenttype: string;
  nextdue: string;
}

@Injectable({
  providedIn: 'root'
})

/*
  Implements the various CRUD operations relating
  to the Members classes.
*/
export class MembersService {

  constructor(private _http: HttpClient) { }

  /**
    @name getMemberList()
    @return Returns An observable object from the HTTP request (Observable<Response>)
    @description Uses the provided API to retrieve a list of members
  */
  public getMemberList() {
    return this._http.get("/api/members/read.php", {params: new HttpParams().set('action', 'all')}).pipe(map(res => {
      if(res['members']) {
        for(var i = 0; i < res['members'].length; i++) {
          this.processMember(res['members'][i]);
        }
        return res;
      } else {
        return null;
      }
    }));
  }

  /**
    @name processMember()
    @param aMember a Member Object
    @description Processes a member to formatted text
  */
  public processMember(aMember: Member): void {
    var regDate = new Date(aMember['regdate']);
    aMember['regdate'] = moment(regDate).format('YYYY-MM-DD');
    if(!aMember['lastpaymentdate']) {
      aMember['nextdue'] = moment(aMember['regdate']).add(14, 'days').format('YYYY-MM-DD');
    } else {
      aMember['nextdue'] = moment(aMember['lastpaymentdate']).add(14, 'days').format('YYYY-MM-DD');
    }
  }

}
