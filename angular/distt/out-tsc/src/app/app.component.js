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
var app_model_1 = require("./app.model");
var app_service_1 = require("./app.service");
var angular2_toaster_1 = require("angular2-toaster");
var AppComponent = (function () {
    function AppComponent(router, empDataSr, _service, toasterService) {
        this.router = router;
        this.empDataSr = empDataSr;
        this._service = _service;
        this.toasterService = toasterService;
        this.title = 'app works!';
        this.config1 = new angular2_toaster_1.ToasterConfig({
            positionClass: 'toast-top-center',
            limit: 1
        });
    }
    AppComponent.prototype.popToast = function () {
        var toast = {
            type: 'info',
            title: 'Here is a Toast Title',
            body: 'Here is a Toast Body'
        };
        this.toasterService.pop(toast);
    };
    AppComponent.prototype.ngOnInit = function () {
        this.onRefresh();
    };
    Object.defineProperty(AppComponent.prototype, "isLoggedIn", {
        get: function () {
            return this.empDataSr.isLoggedIn();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "name", {
        get: function () {
            if (this.empDataSr.empInfo.middleName === null) {
                return this.empDataSr.empInfo.firstName + " " + this.empDataSr.empInfo.lastName;
            }
            else {
                return this.empDataSr.empInfo.firstName + " " + this.empDataSr.empInfo.middleName + " " + this.empDataSr.empInfo.lastName;
            }
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.Home = function () {
        var screen = '';
        switch (this.empDataSr.empInfo.userRole) {
            case 0: {
                screen = 'leave';
                this.empDataSr.isAdmin = false;
                this.router.navigate([screen]);
                break;
            }
            case 1: {
                screen = 'admin';
                this.empDataSr.isAdmin = true;
                this.router.navigate([screen]);
                break;
            }
            case 2: {
                screen = 'admin';
                this.empDataSr.isAdmin = true;
                this.router.navigate([screen]);
                break;
            }
        }
    };
    Object.defineProperty(AppComponent.prototype, "reload", {
        get: function () {
            return this.empDataSr.loading;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.logout = function () {
        this.empDataSr.logout();
        this.router.navigate(['']);
        localStorage.setItem('app_data', '');
    };
    AppComponent.prototype.setpassword = function () {
        this.router.navigate(['setpassword']);
    };
    AppComponent.prototype.onRefresh = function () {
        var _this = this;
        console.log("Just testing !!!!!!!!!!");
        var dt = localStorage.getItem("app_data");
        if (dt) {
            var value_1 = JSON.parse(dt);
            this._service.getEmployees(value_1)
                .subscribe(function (resEmployeeData) {
                for (var _i = 0, resEmployeeData_1 = resEmployeeData; _i < resEmployeeData_1.length; _i++) {
                    var item = resEmployeeData_1[_i];
                    if (item.username === value_1.username && item.password === value_1.password) {
                        //this.employees = item;
                        _this.empDataSr.setEmpInfo(item);
                        _this.empDataSr.loggedIn = true;
                        switch (item.usertype) {
                            case 'U': {
                                //screen = 'leave'
                                _this.empDataSr.isAdmin = false;
                                break;
                            }
                            case 'A': {
                                //screen = 'admin'
                                _this.empDataSr.isAdmin = true;
                                break;
                            }
                        }
                    }
                    ;
                }
            });
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, app_model_1.EmpDataService, app_service_1.EmployeedataService, angular2_toaster_1.ToasterService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map