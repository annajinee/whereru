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
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
export var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (email) {
        localStorage.clear();
        localStorage.setItem('email', email);
        if (localStorage.getItem('email') !== null) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('email');
        localStorage.clear();
    };
    AuthenticationService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    AuthenticationService.prototype.isSignedIn = function () {
        console.log('email' + localStorage.getItem('email'));
        return localStorage.getItem('email') !== null;
    };
    AuthenticationService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/services/authentication.service.js.map