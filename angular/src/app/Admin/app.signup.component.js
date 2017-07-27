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
var SignupComponent = (function () {
    function SignupComponent(route, _restfull) {
        this.route = route;
        this._restfull = _restfull;
        this.manager_list = [
            { name: 'Gokul Janarthanan', department: "QA" },
            { name: 'Rajdeep Biswas', department: "IT" },
            { name: 'Venkat', department: "Developement" }
        ];
        this.selectedPerson = {};
        this.showId = true;
    }
    SignupComponent.prototype.onSubmit = function (value) {
        this._restfull.saveRetur(value)
            .subscribe(function (dataResponse) { console.log("exec " + dataResponse); });
    };
    SignupComponent.prototype.onChanged = function ($event) {
        var match = this.manager_list.find(function (x) { return x.name === $event; });
        this.selectedPerson.dept = match.department;
    };
    SignupComponent.prototype.onchange = function ($event) {
        if ($event === "onsite") {
            this.showId = false;
        }
        else {
            this.showId = true;
            this.selectedPerson.dept = null;
        }
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        selector: 'signup',
        templateUrl: 'app/Admin/app.signup.component.html',
        providers: [app_service_1.EmployeedataService],
    }),
    __metadata("design:paramtypes", [router_1.Router, app_service_1.EmployeedataService])
], SignupComponent);
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=app.signup.component.js.map