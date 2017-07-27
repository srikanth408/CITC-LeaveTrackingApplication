import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
    private baseApiUrl = 'http://localhost:8000/api/';
    private loggedIn = false;

    constructor(private http: Http) {
        this.loggedIn = !!localStorage.getItem('authToken');
     }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    userLogin(username: string, password: string) {
        let url = this.baseApiUrl + 'login/';
        let body = JSON.stringify({'username': username, 'password': password});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options).map(this.extractData);
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}