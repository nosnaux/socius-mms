import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private _http: HttpClient) { }

  public getMembers(): any {
    this._http.get("/api/members/read.php?action=all").subscribe((res: any) => {
      console.log(res);
    });
  }

  public getMember(aID: number): any {
    this._http.get("/api/members/read.php?action=single&id="+aID).subscribe((res: any) => {
      console.log(res);
    });
  }

}
