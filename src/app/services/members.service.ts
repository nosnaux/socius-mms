import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

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

export class MembersService {

  constructor(private _http: HttpClient, private toastr: ToastrService) { }

  /**
  *  @name getMemberList()
  *  @return Returns An observable object from the HTTP request (Observable<Response>)
  *  @description Uses the provided API to retrieve a list of members
  */
  public getMemberList() {
    return this._http.get("/api/members.php").pipe(map(res => {
      if(!(res['result']['code'] === 200)) {
        this.toastr.error(res["result"]["message"], '', {positionClass: 'toast-top-full-width'});
        return null;
      } else {
        if(!(res['members'] === "{}")) {
          if(res['members']) {
            for(var i = 0; i < res['members'].length; i++) {
              this.processMember(res['members'][i]);
            }
          } else {
            this.processMember(res['member']);
          }
          return res;
        } else {
          return null;
        }
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
    if((aMember['lastpaymentfor'] === 'NULL')) {
      aMember['nextdue'] = moment(aMember['regdate']).add(1, 'weeks').format('YYYY-MM-DD');
    } else {
      switch(aMember['lastpaymenttype']) {
        case "MN":
          aMember['nextdue'] = moment(aMember['lastpaymentfor']).add(4, 'weeks').format('YYYY-MM-DD');
          break;
        case "HY":
          aMember['nextdue'] = moment(aMember['lastpaymentfor']).add(6, 'months').format('YYYY-MM-DD');
          break;
        case "YR":
          aMember['nextdue'] = moment(aMember['lastpaymentfor']).add(1, 'year').format('YYYY-MM-DD');
          break;
        default:
          break;
      }
    }
  }


  /**
  * @name declareNewMember()
  * @param aMemberDetails A Member object
  * @desc Sends a HTTP POST request to the database, and sending the member object
  *       to add to the database.
  */
  public declareNewMember(aMemberDetails: object) {
    return this._http.post("/api/members.php", aMemberDetails).pipe(map(
      res => {
        if(res["result"]["code"] === 200) {
          this.toastr.success("New member successfully added to database.",'',{positionClass: 'toast-top-full-width'});
          this.processMember(res['member']);
        } else {
          this.toastr.error(res["result"]["message"], '', {positionClass: 'toast-top-full-width'});
        }
        return res;
      }));
  }

}
