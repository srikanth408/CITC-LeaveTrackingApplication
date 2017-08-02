"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var app_routing_2 = require("./app.routing");
var app_model_1 = require("./app.model");
var app_service_1 = require("./app.service");
var angular2_toaster_1 = require("angular2-toaster");
var animations_1 = require("@angular/platform-browser/animations");
var ng2_filter_pipe_1 = require("ng2-filter-pipe");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.RoutingComponent, forms_1.FormsModule, http_1.HttpModule, animations_1.BrowserAnimationsModule, angular2_toaster_1.ToasterModule, ng2_filter_pipe_1.Ng2FilterPipeModule],
            declarations: [app_component_1.AppComponent, app_routing_2.routingModuleComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [app_model_1.EmpDataService, app_service_1.EmployeedataService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map