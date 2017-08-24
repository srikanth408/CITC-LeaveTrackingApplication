import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class holidayService {
    private _url: string ='/copartLTA/rest/api/v1/lta/holidays';
    private editHolidayList_url:string='/copartLTA/rest/api/v1/lta/editHolidayList';


    constructor(
        private _router: Router, private _http: Http) { }


    getHolidays() {
       return this._http.get(this._url)
            .map((response: Response) => response.json().body);

    }
    saveHolidayList(data:any){
    console.log('Finished');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(data);
    return this._http.post(this.editHolidayList_url, data, headers)
      .map((res: Response) => res.json()); 
    }


}