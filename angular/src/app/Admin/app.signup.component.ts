import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeedataService } from '../app.service';
import { NgForm } from '@angular/forms';
import { EmpDataService } from '../app.model';
import { ToasterContainerComponent, ToasterService, Toast, ToasterConfig } from 'angular2-toaster';



@Component({
    selector: 'signup',
    templateUrl: './app.signup.component.html',
    providers: [EmployeedataService],

})

export class SignupComponent {
    /* public manager_list: any[] = [
         { name: 'Gokul Janarthanan', Id: '0012', department: "QA" },
         { name: 'Rajdeep Biswas', Id: '0013', department: "IT" },
         { name: 'Venkat', Id: '0014', department: "Developement" }
     ];*/
    public selectedPerson: any = {};
    public showId: boolean = true;
    public managerslist: any;
    public onsitemanagerslist: any;
    public userList: any;
    public errEmailMsg: any;
    public errEmpCodeMsg: any;
    public obj = [];


    constructor(public route: Router,
        public _restfull: EmployeedataService,
        public empDataSr: EmpDataService,
        public toasterService: ToasterService) { }

    ngOnInit() {

        this.getmanagersList();
        this.getonsiteManagersList();
        this.getuserlist();

    }
    getmanagersList() {
        this._restfull.getManagers()
            .subscribe(data => this.managerslist = data);

    }
    getonsiteManagersList() {
        this._restfull.getOnsiteManagers()
            .subscribe(data => this.onsitemanagerslist = data);

    }
    getuserlist() {
        this._restfull.getEmployeeData()
            .subscribe(data => {
                this.userList = data;

            });
    }

    onSubmit(value: any, opt: any) {
        this.empDataSr.loading = true;
        for (var i = 0; i < this.userList.length; i++) {
            if (this.userList[i].email === value.email) {
                this.empDataSr.loading = false;
               this.popToastEmail();
               return;
              }else if (this.userList[i].empCode === value.empCode) {
               this.empDataSr.loading = false;
               this.popToastEmpcode();
                return;
            } 
        }
                 this._restfull.saveRetur(value)
                    .subscribe((res) => {
                        if (res.header && res.header == 'Ok') {
                            opt.resetForm();
                            this.empDataSr.loading = false;
                            this.popToastSuccess();
                            this.getuserlist();
                        }else{
                             this.empDataSr.loading = false;
                             this.popToastFailed();
                        } 
                    });
            
    }

 /*checkDuplicates(value:any){
        for (var i = 0; i < this.userList.length; i++) {
            if (this.userList[i].email === value.email) {
               this.popToastEmail();
              }else if (this.userList[i].empCode === value.empCode) {
               this.popToastEmpcode();
            } 
        }
    }*/
    popToastSuccess() {
        var toast: Toast = {
            type: 'success',
            title: 'You submitted record successfully',
            body: 'Thank you'
        };

        this.toasterService.pop(toast);
    }
    popToastFailed() {
        var toast: Toast = {
            type: 'error',
            title: 'Error in while submitting your record',
            body: 'Thank you'
        };

        this.toasterService.pop(toast);
    }
    popToastEmail() {
        var toast: Toast = {
            type: 'error',
            title: 'Email Already used'
        };

        this.toasterService.pop(toast);
    }
    popToastEmpcode() {
        var toast: Toast = {
            type: 'error',
            title: 'Emp code Already used'
        };

        this.toasterService.pop(toast);
    }

    onChanged($event: any) {
        var match = this.onsitemanagerslist.filter(x => x.dept === $event);
        this.obj = [];
        match.forEach(element => {
            this.obj.push(element.firstName);
        });

    }
    /*get isMainAdmin() {
        return this.empDataSr.isMainAdmin;
    }*/



}









