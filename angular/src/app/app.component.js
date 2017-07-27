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
//import{AuthenticationService} from './app.authenticationservice';
var app_model_1 = require("./app.model");
var app_service_1 = require("./app.service");
var AppComponent = (function () {
    function AppComponent(router, empDataSr, _service) {
        this.router = router;
        this.empDataSr = empDataSr;
        this._service = _service;
    }
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
    AppComponent.prototype.logout = function () {
        this.empDataSr.logout();
        this.router.navigate(['']);
        localStorage.setItem('app_data', '');
    };
    AppComponent.prototype.onRefresh = function () {
        var _this = this;
        console.log("Just testing !!!!!!!!!!");
        var dt = localStorage.getItem("app_data");
        if (dt) {
            var value_1 = JSON.parse(dt);
            this._service.getEmployees()
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
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html',
        providers: [app_service_1.EmployeedataService]
    }),
    __metadata("design:paramtypes", [router_1.Router, app_model_1.EmpDataService, app_service_1.EmployeedataService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map