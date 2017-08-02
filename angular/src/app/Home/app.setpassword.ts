import { Component } from '@angular/core';
import { EmployeedataService } from '../app.service';
import { EmpDataService } from '../app.model';
import { ToasterContainerComponent, ToasterService, Toast, ToasterConfig } from 'angular2-toaster';




@Component({
    selector: 'set-password',
    templateUrl: './app.setpassword.html',
    providers: [EmployeedataService],

})


export class SetPasswordComponent {

    public oldpassword:any;
    public password:any;
    public repeatPassword:any;



    constructor(public _restfull: EmployeedataService,
        public empDataSr: EmpDataService,
        public toasterService: ToasterService) {

    }

    onSubmit(value: any, opt: any) {
        this.empDataSr.loading = true;
        this._restfull.resetPassword(value.oldpassword, value.password)
            .subscribe((res) => {
                if (res.header && res.header == 'Ok') {
                    opt.resetForm();
                    this.empDataSr.loading = false;
                    this.popToastSuccess();
                }else if(res.header && res.header !== 'Ok'){
                    this.empDataSr.loading = false;
                    this.popToastFailed();
                }

            });
    }
    popToastSuccess() {
        var toast: Toast = {
            type: 'success',
            title: 'You changed your password successfully',
            body: 'Thank you'
        };

        this.toasterService.pop(toast);
    }
    popToastFailed() {
        var toast: Toast = {
            type: 'error',
            title: 'Error in while password changing',
            body: 'Thank you'
        };

        this.toasterService.pop(toast);
    }

}