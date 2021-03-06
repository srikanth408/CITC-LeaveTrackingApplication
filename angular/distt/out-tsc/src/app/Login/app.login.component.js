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
var LoginComponent = (function () {
    function LoginComponent(router, _service, empDataSr) {
        this.router = router;
        this._service = _service;
        this.empDataSr = empDataSr;
        this.employees = {};
        this.errorMsg = [];
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.loginSubmit = function (value) {
        var _this = this;
        var screen = '';
        this._service.getEmployees(value)
            .subscribe(function (resEmployeeData) {
            // for (let item of resEmployeeData) {
            //     if (item.username === value.username && item.password === value.password) {
            //this.employees = item;
            localStorage.setItem("app_data", JSON.stringify(value));
            _this.empDataSr.setEmpInfo(resEmployeeData.body);
            if (resEmployeeData.body.email) {
                _this.empDataSr.loggedIn = true;
                switch (resEmployeeData.body.userRole) {
                    case 0: {
                        screen = 'leave';
                        _this.empDataSr.isAdmin = false;
                        _this.router.navigate([screen]);
                        break;
                    }
                    case 1: {
                        screen = 'admin';
                        _this.empDataSr.isAdmin = true;
                        _this.router.navigate([screen]);
                        break;
                    }
                    case 2: {
                        screen = 'admin';
                        _this.empDataSr.isAdmin = true;
                        _this.router.navigate([screen]);
                        break;
                    }
                }
            }
            else {
                _this.errorMsg = 'Username or password is incorrect';
            }
            // }
            // if (item.username != value.username && item.password != value.password) {
            //     this.errorMsg = 'Username or password is incorrect';
            // }
            // else {
            //     this.router.navigate([screen]);
            // }
            // }
        });
        // for (let i = 0; i < this.employees.length; i++) {
        //     if (this.employees[i].username === value.username && this.employees[i].password === value.password && this.employees[i].usertype === "user") {
        //         this.router.navigate(['leave']);
        //     }
        //     else if (this.employees[i].username === value.username && this.employees[i].password === value.password && this.employees[i].usertype === "admin") {
        //         this.router.navigate(['admin']);
        //     } else {
        //         this.errorMsg = 'Username or password is incorrect';
        //     }
        // }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: '/app.login.component.html',
            providers: [app_service_1.EmployeedataService]
        }),
        __metadata("design:paramtypes", [router_1.Router, app_service_1.EmployeedataService, app_model_1.EmpDataService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=app.login.component.js.map