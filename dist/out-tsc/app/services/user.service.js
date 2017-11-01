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
import { Router } from "@angular/router";
import { Observable } from "rxjs";
export var UserService = (function () {
    function UserService(http, router) {
        this.http = http;
        this.router = router;
        this.url = '/api/users';
    }
    // 사용자 생성
    UserService.prototype.createUser = function (user) {
        return this.http.post(this.url + '/create', user, { headers: this.prepareHeaders() }).catch(this.handleError);
    };
    //////////////////////
    UserService.prototype.prepareHeaders = function () {
        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-auth-token': localStorage.getItem('currentUser')
        });
    };
    UserService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    UserService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, Router])
    ], UserService);
    return UserService;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/services/user.service.js.map