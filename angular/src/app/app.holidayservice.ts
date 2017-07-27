import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class holidayService {
    private _url: string ='/copartLTA/rest/api/v1/lta/holidays'; 


    constructor(
        private _router: Router, private _http: Http) { }


    getHolidays() {
       return this._http.get(this._url)
            .map((response: Response) => response.json().body);

    }


}