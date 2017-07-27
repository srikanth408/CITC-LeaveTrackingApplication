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


    constructor(public route: Router,
        public _restfull: EmployeedataService,
        public empDataSr: EmpDataService,
        public toasterService: ToasterService) { }

    ngOnInit() {

        this.getmanagersList();
        this.getonsiteManagersList();

    }
    getmanagersList() {
        this._restfull.getManagers()
            .subscribe(data => this.managerslist = data);

    }
    getonsiteManagersList() {
        this._restfull.getOnsiteManagers()
            .subscribe(data => this.onsitemanagerslist = data);

    }

    onSubmit(value: Object, opt: any) {
        this.empDataSr.loading = true;
        this._restfull.saveRetur(value)
            .subscribe((res) => {
                if (res.header && res.header == 'Ok') {
                    opt.resetForm();
                    this.empDataSr.loading = false;
                    this.popToastSuccess();
                } else if (res.header && res.header !== 'Ok') {
                    this.empDataSr.loading = false;
                    this.popToastFailed();
                }

            });


    }
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

 onChanged($event: any) {
        var match = this.managerslist.find(x => x.empCode === $event);
        this.selectedPerson.dept = match.dept;
        console.log(this.managerslist);
    }

    onchange($event: any) {
        if ($event === "2") {
            this.showId = false;
        } else {
            this.showId = true;
            this.selectedPerson.dept = null;
        }
    }

}









