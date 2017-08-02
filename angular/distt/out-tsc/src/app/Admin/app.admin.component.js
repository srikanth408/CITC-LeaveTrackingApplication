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
var app_service_1 = require("../app.service");
var app_model_1 = require("../app.model");
var angular2_toaster_1 = require("angular2-toaster");
var AdminComponent = (function () {
    function AdminComponent(_service, empDataSr, toasterService) {
        this._service = _service;
        this.empDataSr = empDataSr;
        this.toasterService = toasterService;
        this.EmployeeId = {};
        this.userFilter = { employeeName: '' };
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.EmployeeId = this.empDataSr.getEmpInfo();
        this.getLeaveRequests();
        this.getLeaveRequestHistory();
    };
    AdminComponent.prototype.approveRejectAction = function (index, status) {
        var _this = this;
        this.empDataSr.loading = true;
        this._service.ApproveRejectLeave(status, this.employee[index].reqId)
            .subscribe(function (res) {
            if (res.header && res.header == 'Ok') {
                _this.getLeaveRequests();
                _this.getLeaveRequestHistory();
                _this.empDataSr.loading = false;
                _this.popToastSuccess();
            }
            else if (res.header && res.header !== 'Ok') {
                _this.empDataSr.loading = false;
                _this.popToastFailed();
            }
        });
    };
    AdminComponent.prototype.cancelLeaveAction = function (index, status) {
        var _this = this;
        if (this.leaveHistory[index].status === "Approved") {
            this.empDataSr.loading = true;
            this._service.ApproveRejectLeave(status, this.leaveHistory[index].reqId)
                .subscribe(function (res) {
                if (res.header && res.header == 'Ok') {
                    _this.getLeaveRequests();
                    _this.getLeaveRequestHistory();
                    _this.empDataSr.loading = false;
                    _this.popToastSuccess();
                }
                else if (res.header && res.header !== 'Ok') {
                    _this.empDataSr.loading = false;
                    _this.popToastFailed();
                }
            });
        }
        else {
            this.popToastFailed();
        }
    };
    AdminComponent.prototype.getLeaveRequests = function () {
        var _this = this;
        this._service.getLeaves(this.EmployeeId.empCode, "A")
            .subscribe(function (data) { return _this.employee = data; });
    };
    AdminComponent.prototype.getLeaveRequestHistory = function () {
        var _this = this;
        this._service.getLeavesApproveReject(this.EmployeeId.empCode, "A")
            .subscribe(function (data) { return _this.leaveHistory = data; });
    };
    AdminComponent.prototype.popToastSuccess = function () {
        var toast = {
            type: 'success',
            title: 'Your request has been done successfully',
            body: 'Thank you'
        };
        this.toasterService.pop(toast);
    };
    AdminComponent.prototype.popToastFailed = function () {
        var toast = {
            type: 'error',
            title: 'Error in while submitting your request',
            body: 'Thank you'
        };
        this.toasterService.pop(toast);
    };
    AdminComponent = __decorate([
        core_1.Component({
            templateUrl: '/app.admin.component.html',
            providers: [app_service_1.EmployeedataService]
        }),
        __metadata("design:paramtypes", [app_service_1.EmployeedataService,
            app_model_1.EmpDataService,
            angular2_toaster_1.ToasterService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=app.admin.component.js.map