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
        this._url = '/copartLTA/rest/api/v1/lta/login'; // <replace json file URL with rest api URL for auth>
        this._baseUrl = '/copartLTA/rest/api/v1/lta';
        this._addUrl = '/copartLTA/rest/api/v1/lta/addUser';
        this._saveUrl = '/copartLTA/rest/api/v1/lta/editUser';
        this._empdataUrl = '/copartLTA/rest/api/v1/lta/listUser';
        this._ApplyLeaveUrl = '/copartLTA/rest/api/v1/lta/applyLeave';
        this._ApproveRejectLeaveUrl = '/copartLTA/rest/api/v1/lta/aprroveReject';
        this._DeleteuserUrl = '/copartLTA/rest/api/v1/lta/deleteUser';
        this._ApproveRejectListUrl = '/copartLTA/rest/api/v1/lta/ApproveRejectList';
        this._ManagersListUrl = '/copartLTA/rest/api/v1/lta/managers';
        this._OnsiteManagersListUrl = '/copartLTA/rest/api/v1/lta/onsitemanagers';
        this._ResetPasswordUrl = '/copartLTA/rest/api/v1/lta/resetPassword';
    }
    EmployeedataService.prototype.getEmployees = function (opt) {
        //Change the following method to post for server authentication.
        return this._http.post(this._url, opt)
            .map(function (response) { return response.json(); });
    };
    EmployeedataService.prototype.saveRetur = function (data) {
        console.log('Finished');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(data);
        return this._http.post(this._addUrl, data, headers)
            .map(function (res) { return res.json(); });
    };
    EmployeedataService.prototype.LeaveRetur = function (data) {
        console.log('Finished');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(data);
        return this._http.post(this._ApplyLeaveUrl, data, headers)
            .map(function (res) { return res.json(); });
    };
    EmployeedataService.prototype.savedata = function (data) {
        console.log('Finished');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(data);
        return this._http.post(this._saveUrl, data, headers)
            .map(function (res) { return res.json(); });
    };
    EmployeedataService.prototype.deletedata = function (data) {
        console.log('Finished');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(data);
        return this._http.post(this._DeleteuserUrl, data, headers)
            .map(function (res) { return res.json(); });
    };
    EmployeedataService.prototype.getLeaves = function (empid, reqType) {
        return this._http.get(this._baseUrl + "/listLeavesApplied?empId=" + empid + "&requestType=" + reqType)
            .map(function (response) { return response.json().body; });
    };
    EmployeedataService.prototype.getEmployeeData = function () {
        return this._http.get(this._empdataUrl)
            .map(function (response) { return response.json().body; });
    };
    EmployeedataService.prototype.ApproveRejectLeave = function (status, reqId) {
        console.log('Finished');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._ApproveRejectLeaveUrl + "?reqId=" + reqId + "&status=" + status, headers)
            .map(function (res) { return res.json(); });
    };
    EmployeedataService.prototype.getLeavesApproveReject = function (empid, reqType) {
        return this._http.get(this._ApproveRejectListUrl + "?empId=" + empid + "&requestType=" + reqType)
            .map(function (response) { return response.json().body; });
    };
    EmployeedataService.prototype.resetPassword = function (oldpassword, password) {
        console.log('Finished');
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._ResetPasswordUrl + "?oldpassword=" + oldpassword + "&password=" + password, headers)
            .map(function (res) { return res.json(); });
    };
    EmployeedataService.prototype.getManagers = function () {
        return this._http.get(this._ManagersListUrl)
            .map(function (response) { return response.json().body; });
    };
    EmployeedataService.prototype.getOnsiteManagers = function () {
        return this._http.get(this._OnsiteManagersListUrl)
            .map(function (response) { return response.json().body; });
    };
    EmployeedataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, http_1.Http])
    ], EmployeedataService);
    return EmployeedataService;
}());
exports.EmployeedataService = EmployeedataService;
//# sourceMappingURL=app.service.js.map