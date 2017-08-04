import { Injectable } from "@angular/core";
@Injectable()
export class EmpDataService {
    empInfo: any;
    public loggedIn: boolean;
    public isManager: boolean;
    public isAdmin: boolean;
    public isMainAdmin:boolean;
    public loading: boolean = false;

    isLoggedIn() {
        return this.loggedIn;
    }

    setEmpInfo(data: any) {
        this.empInfo = data;
    }

    getEmpInfo() {
        return this.empInfo;
    }
    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
    }
    
}
