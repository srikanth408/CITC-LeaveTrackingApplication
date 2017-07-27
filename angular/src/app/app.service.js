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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var EmployeedataService = (function () {
    function EmployeedataService(_router, _http) {
        this._router = _router;
        this._http = _http;
        this._url = 'app/Apidata/app.employeedata.json'; // <replace json file URL with rest api URL for auth>
    }
    EmployeedataService.prototype.getEmployees = function () {
        //Change the following method to post for server authentication.
        //return this._http.post(this._url, opt) example call
        return this._http.get(this._url)
            .map(function (response) { return response.json(); });
    };
    EmployeedataService.prototype.saveRetur = function (data) {
        console.log('Finished');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(data);
        return this._http.post('api/save', data, headers)
            .map(function (res) { return res.json(); });
    };
    EmployeedataService.prototype.LeaveRetur = function (data) {
        console.log('Finished');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(data);
        return this._http.post('api/save', data, headers)
            .map(function (res) { return res.json(); });
    };
    EmployeedataService.prototype.savedata = function (data) {
        console.log('Finished');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(data);
        return this._http.post('api/save', data, headers)
            .map(function (res) { return res.json(); });
    };
    EmployeedataService.prototype.deletedata = function (data) {
        console.log('Finished');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(data);
        return this._http.post('api/save', data, headers)
            .map(function (res) { return res.json(); });
    };
    return EmployeedataService;
}());
EmployeedataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], EmployeedataService);
exports.EmployeedataService = EmployeedataService;
//# sourceMappingURL=app.service.js.map