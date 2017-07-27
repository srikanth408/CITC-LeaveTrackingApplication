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
var LeaveComponent = (function () {
    function LeaveComponent(routes, _service, empDataSr, _hservice) {
        this.routes = routes;
        this._service = _service;
        this.empDataSr = empDataSr;
        this._hservice = _hservice;
        this.leaveHistory = [];
        this.employees = {};
        this.newEntry = {};
        this.leave = {};
    }
    LeaveComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.data =  new Observable<EmpDataService>((observer: Observer<EmpDataService>) =>{
        this.employees = this.empDataSr.getEmpInfo();
        //});
        //     let subscription = this.data.subscribe(
        //       value => {this.employees = value; console.log(value)}
        //   );
        this._hservice.getHolidays()
            .subscribe(function (data) { return _this.holidays = data; });
    };
    LeaveComponent.prototype.OnSubmit = function (value) {
        this.leaveHistory.push(value);
        this._service.LeaveRetur(value)
            .subscribe(function (dataResponse) { console.log("exec " + dataResponse); });
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
        fromdate = new Date(fromdate);
        todate = new Date(todate);
        var date1_unixtime = fromdate.getTime() / 1000;
        var date2_unixtime = todate.getTime() / 1000;
        var timeDifference = date2_unixtime - date1_unixtime;
        var timeDifferenceInHours = timeDifference / 60 / 60;
        var timeDifferenceInDays = timeDifferenceInHours / 24 + 1;
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
        console.log(count);
        for (var i_1 = 0; i_1 < this.holidays.length; i_1++) {
            var today = new Date(this.holidays[i_1]);
            if ((this.holidays[i_1] <= date2 && this.holidays[i_1] >= date1) && (today.getDay() !== 0 && today.getDay() !== 6)) {
                count++;
                console.log(count);
            }
        }
        this.leaves = timeDifferenceInDays - totalWeekdays - count;
    };
    return LeaveComponent;
}());
LeaveComponent = __decorate([
    core_1.Component({
        selector: 'leave',
        templateUrl: 'app/Home/app.leave.component.html',
        providers: [app_service_1.EmployeedataService, app_holidayservice_1.holidayService]
    }),
    __metadata("design:paramtypes", [router_1.Router, app_service_1.EmployeedataService, app_model_1.EmpDataService, app_holidayservice_1.holidayService])
], LeaveComponent);
exports.LeaveComponent = LeaveComponent;
//# sourceMappingURL=app.leave.component.js.map