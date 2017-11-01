var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
export var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var loginRequest = JSON.stringify({ username: username, password: password });
        var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        var name;
        this.loadusername(username)
            .subscribe(function (result) {
            name = result;
            localStorage.setItem('name', name); //사용자 명 담기
        });
        return this.http.post('/api/login', loginRequest, { headers: headers })
            .do(function (resp) {
            localStorage.setItem('currentUser', resp.headers.get('x-auth-token'));
            localStorage.setItem('username', username);
        });
    };
    AuthenticationService.prototype.loadusername = function (username) {
        var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.http.post('/api/users/loadbyuser', { username: username }, { headers: headers })
            .map(function (res) { return res.text(); })
            .catch(this.handleError);
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('username');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('name');
        localStorage.clear();
    };
    AuthenticationService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    AuthenticationService.prototype.isSignedIn = function () {
        return localStorage.getItem('currentUser') !== null;
    };
    AuthenticationService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/services/authentication.service.js.map