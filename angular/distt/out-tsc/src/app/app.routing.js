"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_login_component_1 = require("./Login/app.login.component");
var app_leave_component_1 = require("./Home/app.leave.component");
var app_signup_component_1 = require("./Admin/app.signup.component");
var app_edituser_component_1 = require("./Admin/app.edituser.component");
var app_admin_component_1 = require("./Admin/app.admin.component");
var app_setpassword_1 = require("./Home/app.setpassword");
var routes = [
    { path: '', component: app_login_component_1.LoginComponent },
    { path: 'leave', component: app_leave_component_1.LeaveComponent },
    { path: 'admin', component: app_admin_component_1.AdminComponent },
    { path: 'signup', component: app_signup_component_1.SignupComponent },
    { path: 'edit', component: app_edituser_component_1.EdituserComponent },
    { path: 'setpassword', component: app_setpassword_1.SetPasswordComponent },
];
var RoutingComponent = (function () {
    function RoutingComponent() {
    }
    RoutingComponent = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], RoutingComponent);
    return RoutingComponent;
}());
exports.RoutingComponent = RoutingComponent;
exports.routingModuleComponent = [app_login_component_1.LoginComponent, app_leave_component_1.LeaveComponent, app_admin_component_1.AdminComponent, app_edituser_component_1.EdituserComponent, app_signup_component_1.SignupComponent, app_setpassword_1.SetPasswordComponent];
//# sourceMappingURL=app.routing.js.map