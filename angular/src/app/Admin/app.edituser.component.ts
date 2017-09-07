import { Component } from '@angular/core';
import { EmployeedataService } from '../app.service';
import { Router } from '@angular/router';
import { EmpDataService } from '../app.model';
import { holidayService } from '../app.holidayservice';
import { ToasterContainerComponent, ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { IMyDpOptions } from 'mydatepicker';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  templateUrl: './app.edituser.component.html',
  providers: [EmployeedataService, holidayService],

})

export class EdituserComponent {

  public employee: any[];
  public editedIndex: boolean;
  public Save: boolean = false;
  public Edit: boolean = true;
  public deleteIcon: boolean = true;

  public onsiteManagersList: any;
  public holidaysList: any;
  public managersList: any;
  public onsManagerEdit: boolean = true;
  public onsManagerSave: boolean = false;
  public onsManagerDelete: boolean = true;
  public onsEditedIndex: boolean;
  managerEditedIndex: boolean;
  managerEdit: boolean = true;
  managerSave: boolean = false;
  managerDeleteIcon: boolean = true;
  hDateEditedIndex: boolean;
  hDateEdit: boolean = true;
  hDateSave: boolean = false;
  newDept: boolean = false;
  userFilter: any = { empCode: '' };
  managerform: FormGroup;


  private holidaylist: Object = { date: { year: 2018, month: 10, day: 9 } };

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
  };

  constructor(public _service: EmployeedataService,
    public _holidayService: holidayService,
    public route: Router,
    public empDataSr: EmpDataService,
    public toasterService: ToasterService,
    private fb: FormBuilder) { }
  ngOnInit() {
    this.getEmployeeData();
    this.getOnsiteManagersList();
    this.getHolidaysList();
    this.getManagersList();
    this.managerform = this.fb.group({
      resourceManagerEmpCode: [null, Validators.required],
      resourceManagerName: [null, Validators.required],
      resManagerDept: [null, Validators.required],
      //resourceManagerDept: [null, Validators.required]
    });

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  getEmployeeData() {
    this._service.getEmployeeData()
      .subscribe(resEmployeeData => this.employee = resEmployeeData);

  }
  getOnsiteManagersList() {
    this._service.getOnsiteManagers()
      .subscribe(data => this.onsiteManagersList = data);
  }
  getHolidaysList() {
    this._holidayService.getHolidays()
      .subscribe(data => {
        this.holidaysList = data
      });

  }
  getManagersList() {
    this._service.getManagers()
      .subscribe(data => this.managersList = data);
  }

  edit(document: any, i: any) {
    this.editedIndex = i;
    this.Save = true;
    this.Edit = false;
    this.deleteIcon = false;
  }
  save(i: any) {
    this.editedIndex = false;
    this.Save = false;
    this.Edit = true;
    this.deleteIcon = true;
    this.empDataSr.loading = true;
    var savedata = this.employee[i];
    this._service.savedata(savedata)
      .subscribe((res) => {
        if (res.header && res.header == 'Ok') {
          this.getEmployeeData();
          this.empDataSr.loading = false;
          this.popToastSuccess();
        } else if (res.header && res.header !== 'Ok') {
          this.empDataSr.loading = false;
          this.popToastFailed();

        }

      });

  }
  cancel() {
    this.editedIndex = false;
    this.Save = false;
    this.Edit = true;
    this.deleteIcon = true;
    this.getEmployeeData();
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
          } else if (res.header && res.header !== 'Ok') {
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
  onsiteManagerEdit(document: any, i: any) {
    this.onsEditedIndex = i;
    this.onsManagerEdit = false;
    this.onsManagerSave = true;
    this.onsManagerDelete = false;
  }
  onsiteManagerSave(i: any) {
    this.onsEditedIndex = false;
    this.onsManagerEdit = true;
    this.onsManagerSave = false;
    this.onsManagerDelete = true;
    this.empDataSr.loading = true;
    var savedata = this.onsiteManagersList[i];
    this._service.saveOnsiteManagerDetails(savedata)
      .subscribe((res) => {
        if (res.header && res.header == 'Ok') {
          this.getOnsiteManagersList();
          this.empDataSr.loading = false;
          this.popToastSuccess();
        } else if (res.header && res.header !== 'Ok') {
          this.empDataSr.loading = false;
          this.popToastFailed();

        }

      });
  }

  onsiteManagerCancel() {
    this.onsEditedIndex = false;
    this.onsManagerEdit = true;
    this.onsManagerSave = false;
    this.onsManagerDelete = true;
    this.getOnsiteManagersList();

  }
  onsiteManagerDelete(i: any) {
    if (window.confirm("Are you sure want to delete")) {
      this.empDataSr.loading = true;
      var deletedata = this.onsiteManagersList[i];
      this._service.deleteOnsiteManagerDetails(deletedata)
        .subscribe((res) => {
          if (res.header && res.header == 'Ok') {
            this.getOnsiteManagersList();
            this.empDataSr.loading = false;
            this.popToastSuccess();
          } else if (res.header && res.header !== 'Ok') {
            this.empDataSr.loading = false;
            this.popToastFailed();

          }
        });

    }
  }

  addNewOnsiteManager(value: any, opt: any) {
    this._service.addOnsiteManager(value)
      .subscribe((res) => {
        if (res.header && res.header == 'Ok') {
          opt.resetForm();
          this.popToastSuccess();
          this.getOnsiteManagersList();
        } else {
          this.popToastFailed();
        }

      });
  }
  holidayDateEdit(document: any, i: any) {
    this.hDateEditedIndex = i;
    this.hDateEdit = false;
    this.hDateSave = true;

  }
  holidayDateSave(i: any) {
    this.hDateEditedIndex = false;
    this.hDateEdit = true;
    this.hDateSave = false;
    this.empDataSr.loading = true;
    this.holidaysList[i].holidayDate = this.holidaysList[i].holidayDate.formatted;
    var savedata = this.holidaysList[i];
    this._holidayService.saveHolidayList(savedata)
      .subscribe((res) => {
        if (res.header && res.header == 'Ok') {
          this.getHolidaysList();
          this.empDataSr.loading = false;
          this.popToastSuccess();
        } else {
          this.empDataSr.loading = false;
          this.popToastFailed();

        }

      });
  }
  holidayDateCancel(i: any) {
    this.hDateEditedIndex = false;
    this.hDateEdit = true;
    this.hDateSave = false;
    this.getHolidaysList();
  }


  managerListEdit(document: any, i: any) {
    this.managerEditedIndex = i;
    this.managerEdit = false;
    this.managerSave = true;
    this.managerDeleteIcon = false;

  }
  managerListSave(i: any) {
    this.managerEditedIndex = false;
    this.managerEdit = true;
    this.managerSave = false;
    this.managerDeleteIcon = true;
    this.empDataSr.loading = true;
    var savedata = this.managersList[i];
    this._service.saveManagerDetails(savedata)
      .subscribe((res) => {
        if (res.header && res.header == 'Ok') {
          this.getManagersList();
          this.empDataSr.loading = false;
          this.popToastSuccess();
        } else {
          this.empDataSr.loading = false;
          this.popToastFailed();

        }

      });

  }
  managerListCancel() {
    this.managerEditedIndex = false;
    this.managerEdit = true;
    this.managerSave = false;
    this.managerDeleteIcon = true;
    this.getManagersList();

  }

  managerDelete(i: any) {
    if (window.confirm("Are you sure want to delete")) {
      this.empDataSr.loading = true;
      var deletedata = this.managersList[i];
      this._service.deleteManagerDetails(deletedata)
        .subscribe((res) => {
          if (res.header && res.header == 'Ok') {
            this.getManagersList();
            this.empDataSr.loading = false;
            this.popToastSuccess();
          } else {
            this.empDataSr.loading = false;
            this.popToastFailed();

          }
        });

    }
  }
  addNewManager() {
    if (this.managerform.valid) {
      this.managerform.value.resourceManagerDept = (this.managerform.value.resManagerDept === "New") ? this.managerform.value.resourceManagerDept : this.managerform.value.resManagerDept;
      this._service.addManager(this.managerform.value.resourceManagerName, this.managerform.value.resourceManagerDept, this.managerform.value.resourceManagerEmpCode)
        .subscribe((res) => {
          if (res.header && res.header == 'Ok') {
            this.managerform.reset();
            this.popToastSuccess();
            this.getManagersList();
            this.newDept = false;
          }
        });

    } else {
      this.validateAllFormFields(this.managerform); //{7}
    }


  }
  selectDeptChanged(value: any) {
    if (value === "New") {
      this.newDept = true;
      ['resourceManagerDept'].forEach(ctrlName => {
        this.managerform.addControl(ctrlName, new FormControl('', Validators.required));
      });
    } else {
      this.newDept = false;
    }

  }


}