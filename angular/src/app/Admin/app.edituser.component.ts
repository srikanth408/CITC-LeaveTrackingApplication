import { Component } from '@angular/core';
import { EmployeedataService } from '../app.service';
import { Router } from '@angular/router';
import { EmpDataService } from '../app.model';
import { ToasterContainerComponent, ToasterService, Toast, ToasterConfig } from 'angular2-toaster';



@Component({
  templateUrl: '/app.edituser.component.html',
  providers: [EmployeedataService],

})

export class EdituserComponent {

  private employee: any[];
  private editedIndex: boolean;
  private Save: boolean = false;
  private Edit: boolean = true;
  userFilter: any = { empCode: '' };

  constructor(private _service: EmployeedataService,
    private route: Router,
    private empDataSr: EmpDataService,
    private toasterService: ToasterService) { }
  ngOnInit() {
    this.getEmployeeData();

  }
  getEmployeeData() {
    this._service.getEmployeeData()
      .subscribe(resEmployeeData => this.employee = resEmployeeData);

  }



  edit(document: any, i: any) {
    this.editedIndex = i;
    this.Save = true;
    this.Edit = false;
  }
  save(i: any) {
    this.editedIndex = false;
    this.Save = false;
    this.Edit = true;
    this.empDataSr.loading = true;
    var savedata = this.employee[i];
    this._service.savedata(savedata)
      .subscribe((res) => {
        if (res.header && res.header == 'Ok') {
          this.getEmployeeData();
          this.empDataSr.loading = false;
          this.popToastSuccess();
        }else if(res.header && res.header !== 'Ok'){
           this.empDataSr.loading = false;
           this.popToastFailed();

        }

      });

  }
  delete(i: number) {
    if (window.confirm("Are you sure want to delete")) {
      this.empDataSr.loading = true;
      var deletedata = this.employee[i];
      this._service.deletedata(deletedata)
        .subscribe((res) => {
          if (res.header && res.header == 'Ok') {
            this.getEmployeeData();
            this.empDataSr.loading = false;
            this.popToastSuccess();
          }else if(res.header && res.header !== 'Ok'){
           this.empDataSr.loading = false;
           this.popToastFailed();

        }
        });

    }

  }

  popToastSuccess() {
    var toast: Toast = {
      type: 'success',
      title: 'Your request has been submitted successfully',
      body: 'Thank you'
    };

    this.toasterService.pop(toast);
  }
  popToastFailed() {
    var toast: Toast = {
      type: 'error',
      title: 'Error in while submitting your request',
      body: 'Thank you'
    };

    this.toasterService.pop(toast);
  }

}