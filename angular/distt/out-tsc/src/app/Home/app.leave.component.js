"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_service_1 = require("../app.service");
var app_model_1 = require("../app.model");
var app_holidayservice_1 = require("../app.holidayservice");
var angular2_toaster_1 = require("angular2-toaster");
var LeaveComponent = (function () {
    function LeaveComponent(routes, _service, empDataSr, _hservice, toasterService) {
        this.routes = routes;
        this._service = _service;
        this.empDataSr = empDataSr;
        this._hservice = _hservice;
        this.toasterService = toasterService;
        this.employees = {};
        this.newEntry = {};
        this.leave = {};
        this.reqType = "NA";
        this.valid = false;
    }
    LeaveComponent.prototype.ngOnInit = function () {
        //this.data =  new Observable<EmpDataService>((observer: Observer<EmpDataService>) =>{
        this.employees = this.empDataSr.getEmpInfo();
        //});
        //     let subscription = this.data.subscribe(
        //       value => {this.employees = value; console.log(value)}
        //   );
        this.getholidaysList();
        this.getleavesHistory();
    };
    LeaveComponent.prototype.OnSubmit = function (value, opt) {
        var _this = this;
        value.fromDate = this.getformatdate(value.fromDate);
        value.toDate = this.getformatdate(value.toDate);
        this.empDataSr.loading = true;
        this._service.LeaveRetur(value)
            .subscribe(function (res) {
            if (res.header && res.header == 'Ok') {
                _this.getleavesHistory();
                opt.resetForm();
                _this.empDataSr.loading = false;
                _this.popToastSuccess();
            }
            else if (res.header && res.header !== 'Ok') {
                _this.empDataSr.loading = false;
                _this.popToastFailed();
            }
        });
    };
    LeaveComponent.prototype.popToastSuccess = function () {
        var toast = {
            type: 'success',
            title: 'You are applied for leave successfully',
            body: 'Thank you'
        };
        this.toasterService.pop(toast);
    };
    LeaveComponent.prototype.popToastFailed = function () {
        var toast = {
            type: 'error',
            title: 'Error in while appling leave',
            body: 'Thank you'
        };
        this.toasterService.pop(toast);
    };
    LeaveComponent.prototype.getleavesHistory = function () {
        var _this = this;
        this._service.getLeaves(this.employees.empCode, this.reqType)
            .subscribe(function (data) { return _this.leaveHistory = data; });
    };
    LeaveComponent.prototype.getholidaysList = function () {
        var _this = this;
        this._hservice.getHolidays()
            .subscribe(function (data) { return _this.holidays = data; });
    };
    Object.defineProperty(LeaveComponent.prototype, "isAdmin", {
        get: function () {
            return this.empDataSr.isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    LeaveComponent.prototype.onChange = function (value) {
        var fromdate = this.leave.fromdate;
        var todate = this.leave.todate;
        var leavetype = this.leave.leavetype;
        fromdate = new Date(fromdate);
        todate = new Date(todate);
        var date1_unixtime = fromdate.getTime() / 1000;
        var date2_unixtime = todate.getTime() / 1000;
        var timeDifference = date2_unixtime - date1_unixtime;
        var timeDifferenceInHours = timeDifference / 60 / 60;
        var timeDifferenceInDays = timeDifferenceInHours / 24 + 1;
        if (leavetype === "CL") {
            this.leaves = timeDifferenceInDays;
        }
        else if ((leavetype === "SL") || (leavetype === "PL")) {
            var month = fromdate.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            var day = fromdate.getDate();
            day = day < 10 ? '0' + day : day;
            var year = fromdate.getFullYear();
            var date1 = month + "/" + day + "/" + year;
            var month = todate.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            var day = todate.getDate();
            day = day < 10 ? '0' + day : day;
            var year = todate.getFullYear();
            var date2 = month + "/" + day + "/" + year;
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
            for (var i_1 = 0; i_1 < this.holidays.length; i_1++) {
                var holiday = new Date(this.holidays[i_1]);
                if ((this.holidays[i_1] <= date2 && this.holidays[i_1] >= date1) && (holiday.getDay() !== 0 && holiday.getDay() !== 6)) {
                    count++;
                }
            }
            this.leaves = timeDifferenceInDays - totalWeekdays - count;
        }
        var today = new Date();
        if (todate.getTime() < fromdate.getTime()) {
            this.valid = true;
            this.todate_errorMsg = " * Todate can't be Lessthan Fromdate";
        }
        else {
            this.todate_errorMsg = "";
            this.valid = false;
        }
        if (leavetype === "CL" && this.empDataSr.getEmpInfo().numOfCL < this.leaves) {
            this.valid = true;
            this.leaves_errorMsg = " * No of leaves exceeded";
        }
        else if (leavetype === "SL" && this.empDataSr.getEmpInfo().numOfSL < this.leaves) {
            this.valid = true;
            this.leaves_errorMsg = " * No of leaves exceeded";
        }
        else if (leavetype === "PL" && this.empDataSr.getEmpInfo().numOfPL < this.leaves) {
            this.valid = true;
            this.leaves_errorMsg = " * No of leaves exceeded";
        }
        else {
            this.leaves_errorMsg = "";
            this.valid = false;
        }
    };
    LeaveComponent.prototype.getformatdate = function (inputDate) {
        var formattedDate = '';
        var date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            var day = date.getDate().toString();
            var month = (date.getMonth() + 1).toString();
            formattedDate = (month[1] ? month : '0' + month[0]) + '/' +
                (day[1] ? day : '0' + day[0]) + '/' +
                date.getFullYear();
        }
        return formattedDate;
    };
    LeaveComponent = __decorate([
        core_1.Component({
            selector: 'leave',
            templateUrl: '/app.leave.component.html',
            providers: [app_service_1.EmployeedataService, app_holidayservice_1.holidayService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            app_service_1.EmployeedataService,
            app_model_1.EmpDataService,
            app_holidayservice_1.holidayService,
            angular2_toaster_1.ToasterService])
    ], LeaveComponent);
    return LeaveComponent;
}());
exports.LeaveComponent = LeaveComponent;
//# sourceMappingURL=app.leave.component.js.map