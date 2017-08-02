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
var SetPasswordComponent = (function () {
    function SetPasswordComponent(_restfull, empDataSr, toasterService) {
        this._restfull = _restfull;
        this.empDataSr = empDataSr;
        this.toasterService = toasterService;
    }
    SetPasswordComponent.prototype.onSubmit = function (value, opt) {
        var _this = this;
        this.empDataSr.loading = true;
        this._restfull.resetPassword(value.oldpassword, value.password)
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
    SetPasswordComponent.prototype.popToastSuccess = function () {
        var toast = {
            type: 'success',
            title: 'You changed your password successfully',
            body: 'Thank you'
        };
        this.toasterService.pop(toast);
    };
    SetPasswordComponent.prototype.popToastFailed = function () {
        var toast = {
            type: 'error',
            title: 'Error in while password changing',
            body: 'Thank you'
        };
        this.toasterService.pop(toast);
    };
    SetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'set-password',
            templateUrl: '/app.setpassword.html',
            providers: [app_service_1.EmployeedataService],
        }),
        __metadata("design:paramtypes", [app_service_1.EmployeedataService,
            app_model_1.EmpDataService,
            angular2_toaster_1.ToasterService])
    ], SetPasswordComponent);
    return SetPasswordComponent;
}());
exports.SetPasswordComponent = SetPasswordComponent;
//# sourceMappingURL=app.setpassword.js.map