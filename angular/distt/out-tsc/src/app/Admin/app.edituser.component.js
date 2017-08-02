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
var router_1 = require("@angular/router");
var app_model_1 = require("../app.model");
var angular2_toaster_1 = require("angular2-toaster");
var EdituserComponent = (function () {
    function EdituserComponent(_service, route, empDataSr, toasterService) {
        this._service = _service;
        this.route = route;
        this.empDataSr = empDataSr;
        this.toasterService = toasterService;
        this.Save = false;
        this.Edit = true;
        this.userFilter = { empCode: '' };
    }
    EdituserComponent.prototype.ngOnInit = function () {
        this.getEmployeeData();
    };
    EdituserComponent.prototype.getEmployeeData = function () {
        var _this = this;
        this._service.getEmployeeData()
            .subscribe(function (resEmployeeData) { return _this.employee = resEmployeeData; });
    };
    EdituserComponent.prototype.edit = function (document, i) {
        this.editedIndex = i;
        this.Save = true;
        this.Edit = false;
    };
    EdituserComponent.prototype.save = function (i) {
        var _this = this;
        this.editedIndex = false;
        this.Save = false;
        this.Edit = true;
        this.empDataSr.loading = true;
        var savedata = this.employee[i];
        this._service.savedata(savedata)
            .subscribe(function (res) {
            if (res.header && res.header == 'Ok') {
                _this.getEmployeeData();
                _this.empDataSr.loading = false;
                _this.popToastSuccess();
            }
            else if (res.header && res.header !== 'Ok') {
                _this.empDataSr.loading = false;
                _this.popToastFailed();
            }
        });
    };
    EdituserComponent.prototype.delete = function (i) {
        var _this = this;
        if (window.confirm("Are you sure want to delete")) {
            this.empDataSr.loading = true;
            var deletedata = this.employee[i];
            this._service.deletedata(deletedata)
                .subscribe(function (res) {
                if (res.header && res.header == 'Ok') {
                    _this.getEmployeeData();
                    _this.empDataSr.loading = false;
                    _this.popToastSuccess();
                }
                else if (res.header && res.header !== 'Ok') {
                    _this.empDataSr.loading = false;
                    _this.popToastFailed();
                }
            });
        }
    };
    EdituserComponent.prototype.popToastSuccess = function () {
        var toast = {
            type: 'success',
            title: 'Your request has been submitted successfully',
            body: 'Thank you'
        };
        this.toasterService.pop(toast);
    };
    EdituserComponent.prototype.popToastFailed = function () {
        var toast = {
            type: 'error',
            title: 'Error in while submitting your request',
            body: 'Thank you'
        };
        this.toasterService.pop(toast);
    };
    EdituserComponent = __decorate([
        core_1.Component({
            templateUrl: '/app.edituser.component.html',
            providers: [app_service_1.EmployeedataService],
        }),
        __metadata("design:paramtypes", [app_service_1.EmployeedataService,
            router_1.Router,
            app_model_1.EmpDataService,
            angular2_toaster_1.ToasterService])
    ], EdituserComponent);
    return EdituserComponent;
}());
exports.EdituserComponent = EdituserComponent;
//# sourceMappingURL=app.edituser.component.js.map