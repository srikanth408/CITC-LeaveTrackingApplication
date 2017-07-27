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
var EdituserComponent = (function () {
    function EdituserComponent(_service, route) {
        this._service = _service;
        this.route = route;
        this.Save = false;
        this.Edit = true;
    }
    EdituserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service.getEmployees()
            .subscribe(function (resEmployeeData) { return _this.employee = resEmployeeData; });
    };
    EdituserComponent.prototype.edit = function (document, i) {
        this.editedIndex = i;
        this.Save = true;
        this.Edit = false;
    };
    EdituserComponent.prototype.save = function (i) {
        this.editedIndex = false;
        this.Save = false;
        this.Edit = true;
        var savedata = this.employee[i];
        this._service.savedata(savedata)
            .subscribe(function (dataResponse) { console.log("exec " + dataResponse); });
    };
    EdituserComponent.prototype.delete = function (i) {
        if (window.confirm("Are you sure want to delete")) {
            var deletedata = this.employee[i];
            this._service.deletedata(deletedata)
                .subscribe(function (dataResponse) { console.log("exec " + dataResponse); });
            this.employee.splice(i, 1);
        }
    };
    return EdituserComponent;
}());
EdituserComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Admin/app.edituser.component.html',
        providers: [app_service_1.EmployeedataService],
    }),
    __metadata("design:paramtypes", [app_service_1.EmployeedataService, router_1.Router])
], EdituserComponent);
exports.EdituserComponent = EdituserComponent;
//# sourceMappingURL=app.edituser.component.js.map