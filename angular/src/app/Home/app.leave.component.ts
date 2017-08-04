import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeedataService } from '../app.service';
import { EmpDataService } from '../app.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { holidayService } from '../app.holidayservice';
import { ToasterContainerComponent, ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { IMyDpOptions } from 'mydatepicker';




@Component({
    selector: 'leave',
    templateUrl: './app.leave.component.html',
    providers: [EmployeedataService, holidayService]

})

export class LeaveComponent {
    public leaveHistory: any;
    public employees: any = {};
    public data: Observable<any>;
    newEntry: any = {};
    public leave: any = {};
    public leaves;
    public holidays: any;
    public empid: string;
    public reqType: string = "NA";
    public todate_errorMsg: any;
    public leaves_errorMsg: any;
    public valid: boolean = false;
    public totleavesOfCL;
    public totleavesOfSL;
    public totleavesOfPL;

    constructor(public routes: Router,
        public _service: EmployeedataService,
        public empDataSr: EmpDataService,
        public _hservice: holidayService,
        public toasterService: ToasterService) {


    }

    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'mm/dd/yyyy',
    };

    ngOnInit() {
        this.employees = this.empDataSr.getEmpInfo();
        this.getholidaysList();
        this.getleavesHistory();

    }


    OnSubmit(value: any, opt: any) {
        value.fromDate = this.leave.fromdate.formatted;
        value.toDate = this.leave.todate.formatted;
        // value.fromDate = this.getformatdate(value.fromDate);
        //value.toDate = this.getformatdate(value.toDate);
        this.empDataSr.loading = true;
        this._service.LeaveRetur(value)
            .subscribe((res) => {
                if (res.header && res.header == 'Ok') {
                    this.getleavesHistory();
                    opt.resetForm();
                    this.empDataSr.loading = false;
                    this.popToastSuccess();
                } else {
                    this.empDataSr.loading = false;
                    this.popToastFailed();
                }
            });


    }
    popToastSuccess() {
        var toast: Toast = {
            type: 'success',
            title: 'You are applied for leave successfully',
            body: 'Thank you'
        };

        this.toasterService.pop(toast);
    }
    popToastFailed() {
        var toast: Toast = {
            type: 'error',
            title: 'Error in while appling leave',
            body: 'Thank you'
        };

        this.toasterService.pop(toast);
    }




    getleavesHistory() {
        this._service.getLeaves(this.employees.empCode, this.reqType)
            .subscribe(data => {
                this.leaveHistory = data;
                this.totleavesOfCL = 0;
                this.totleavesOfSL = 0;
                this.totleavesOfPL = 0;

                for (var i = 0; i < this.leaveHistory.length; i++) {
                    if (this.leaveHistory[i].status === "Pending" && this.leaveHistory[i].leaveType === "CL") {
                        this.totleavesOfCL = this.totleavesOfCL + this.leaveHistory[i].leavesApplied;
                    }
                    else if (this.leaveHistory[i].status === "Pending" && this.leaveHistory[i].leaveType === "SL") {
                        this.totleavesOfSL = this.totleavesOfSL + this.leaveHistory[i].leavesApplied;
                    }
                    else if (this.leaveHistory[i].status === "Pending" && this.leaveHistory[i].leaveType === "PL") {
                        this.totleavesOfPL = this.totleavesOfPL + this.leaveHistory[i].leavesApplied;
                    }


                }
                this.totleavesOfCL = this.empDataSr.getEmpInfo().numOfCL - this.totleavesOfCL;
                this.totleavesOfSL = this.empDataSr.getEmpInfo().numOfSL - this.totleavesOfSL;
                this.totleavesOfPL = this.empDataSr.getEmpInfo().numOfPL - this.totleavesOfPL;

            });



    }
    getholidaysList() {
        this._hservice.getHolidays()
            .subscribe(data => this.holidays = data);

    }
    get isAdmin() {
        return this.empDataSr.isAdmin;
    }
     get isManager() {
        return this.empDataSr.isManager;
    }
    /*get isMainAdmin() {
        return this.empDataSr.isMainAdmin;
    }*/
    onChange(value, dtType) {
        var _fromdate = this.leave.fromdate ? this.leave.fromdate.formatted : '';
        var _todate = this.leave.todate ? this.leave.todate.formatted : '';
        if (dtType === 'F') {
            _fromdate = value.formatted;
        } else if (dtType === 'T') {
            _todate = value.formatted;
        }
        var leavetype = this.leave.leavetype;
        var fromdate = new Date(_fromdate);
        var todate = new Date(_todate);

        let date1_unixtime = fromdate.getTime() / 1000;
        let date2_unixtime = todate.getTime() / 1000;
        var timeDifference = date2_unixtime - date1_unixtime;
        var timeDifferenceInHours = timeDifference / 60 / 60;
        var timeDifferenceInDays = timeDifferenceInHours / 24 + 1;




        if (leavetype === "CL") {
            this.leaves = timeDifferenceInDays;
        } else if ((leavetype === "SL") || (leavetype === "PL")) {
            var month = fromdate.getMonth() + 1;
            var monthStr = month < 10 ? '0' + month : month;
            var day = fromdate.getDate();
            var dayStr = day < 10 ? '0' + day : day;
            var year = fromdate.getFullYear();
            var date1 = monthStr + "/" + dayStr + "/" + year;
            var tomonth = todate.getMonth() + 1;
            var tomonthStr = tomonth < 10 ? '0' + tomonth : tomonth;
            var toDateDay = todate.getDate();
            var todayStr = toDateDay < 10 ? '0' + toDateDay : toDateDay;
            var toyear = todate.getFullYear();
            var date2 = tomonthStr + "/" + todayStr + "/" + toyear;
            var startDate = new Date(fromdate);
            var endDate = new Date(todate);
            var totalWeekdays = 0;
            for (var i = startDate; i <= endDate;) {
                if (i.getDay() == 0 || i.getDay() == 6) {
                    totalWeekdays++;
                }
                i.setTime(i.getTime() + 1000 * 60 * 60 * 24);
            }

            var count = 0;

            for (let i = 0; i < this.holidays.length; i++) {
                var holiday = new Date(this.holidays[i]);

                if ((this.holidays[i] <= date2 && this.holidays[i] >= date1) && (holiday.getDay() !== 0 && holiday.getDay() !== 6)) {
                    count++;

                }

            }
            this.leaves = timeDifferenceInDays - totalWeekdays - count;
        }
        var today = new Date();
        if (todate.getTime() < fromdate.getTime()) {
            this.valid = true;
            this.todate_errorMsg = " * Todate can't be Lessthan Fromdate";
        } else {
            this.todate_errorMsg = "";
            this.valid = false;
        }
        if (leavetype === "CL" && this.totleavesOfCL < this.leaves) {
            this.valid = true;
            this.leaves_errorMsg = " * No of leaves exceeded";
        } else if (leavetype === "SL" && this.totleavesOfSL < this.leaves) {
            this.valid = true;
            this.leaves_errorMsg = " * No of leaves exceeded";
        } else if (leavetype === "PL" && this.totleavesOfPL < this.leaves) {
            this.valid = true;
            this.leaves_errorMsg = " * No of leaves exceeded";
        } else {
            this.leaves_errorMsg = "";
            this.valid = false;
        }


    }

    /*getformatdate(inputDate) {
        let formattedDate = '';
        var date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            var day = date.getDate().toString();
            var month = (date.getMonth() + 1).toString();

            formattedDate = (month[1] ? month : '0' + month[0]) + '/' +
                (day[1] ? day : '0' + day[0]) + '/' +
                date.getFullYear();

        }

        return formattedDate;
    }*/

}

