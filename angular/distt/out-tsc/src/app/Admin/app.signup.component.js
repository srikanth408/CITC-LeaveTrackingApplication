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
var angular2_toaster_1 = require("angular2-toaster");
var SignupComponent = (function () {
    function SignupComponent(route, _restfull, empDataSr, toasterService) {
        this.route = route;
        this._restfull = _restfull;
        this.empDataSr = empDataSr;
        this.toasterService = toasterService;
        /* private manager_list: any[] = [
             { name: 'Gokul Janarthanan', Id: '0012', department: "QA" },
             { name: 'Rajdeep Biswas', Id: '0013', department: "IT" },
             { name: 'Venkat', Id: '0014', department: "Developement" }
         ];*/
        this.selectedPerson = {};
        this.showId = true;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.getmanagersList();
        this.getonsiteManagersList();
    };
    SignupComponent.prototype.getmanagersList = function () {
        var _this = this;
        this._restfull.getManagers()
            .subscribe(function (data) { return _this.managerslist = data; });
    };
    SignupComponent.prototype.getonsiteManagersList = function () {
        var _this = this;
        this._restfull.getOnsiteManagers()
            .subscribe(function (data) { return _this.onsitemanagerslist = data; });
    };
    SignupComponent.prototype.onSubmit = function (value, opt) {
        var _this = this;
        this.empDataSr.loading = true;
        this._restfull.saveRetur(value)
            .subscribe(function (res) {
            if (res.header && res.header == 'Ok') {
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
    SignupComponent.prototype.popToastSuccess = function () {
        var toast = {
            type: 'success',
            title: 'You submitted record successfully',
            body: 'Thank you'
        };
        this.toasterService.pop(toast);
    };
    SignupComponent.prototype.popToastFailed = function () {
        var toast = {
            type: 'error',
            title: 'Error in while submitting your record',
            body: 'Thank you'
        };
        this.toasterService.pop(toast);
    };
    SignupComponent.prototype.onChanged = function ($event) {
        var match = this.managerslist.find(function (x) { return x.empCode === $event; });
        this.selectedPerson.dept = match.dept;
        console.log(this.managerslist);
    };
    SignupComponent.prototype.onchange = function ($event) {
        if ($event === "2") {
            this.showId = false;
        }
        else {
            this.showId = true;
            this.selectedPerson.dept = null;
        }
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'signup',
            templateUrl: '/app.signup.component.html',
            providers: [app_service_1.EmployeedataService],
        }),
        __metadata("design:paramtypes", [router_1.Router,
            app_service_1.EmployeedataService,
            app_model_1.EmpDataService,
            angular2_toaster_1.ToasterService])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=app.signup.component.js.map