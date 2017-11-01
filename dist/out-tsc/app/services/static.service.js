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
import { Observable } from "rxjs";
import { Headers, Http } from '@angular/http';
import { Router } from "@angular/router";
import { isNullOrUndefined } from "util";
/**
 * Created by annakim on 2017. 2. 20..
 */
export var StaticService = (function () {
    function StaticService(http, router) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.url = '/api/static';
        router.events.subscribe(function () {
            _this.username = localStorage.getItem('username');
        });
    }
    // 추적건수통계
    StaticService.prototype.getTrackingStaticList = function (datefrom, dateto, comcode) {
        if (isNullOrUndefined(this.username)) {
            this.username = localStorage.getItem('username');
        }
        return this.http.post(this.url + '/tracking', { username: this.username, regdate_from: datefrom, regdate_to: dateto, comcode: comcode }, { headers: this.prepareHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // 미배송건수통계
    StaticService.prototype.getTrackingNotDeliveredList = function (datefrom, dateto, comcode) {
        if (isNullOrUndefined(this.username)) {
            this.username = localStorage.getItem('username');
        }
        return this.http.post(this.url + '/notdelivered', {
            username: this.username,
            regdate_from: datefrom,
            regdate_to: dateto,
            comcode: comcode
        }, { headers: this.prepareHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // 배송율통계
    StaticService.prototype.getTrackingDeliveryStaticList = function (datefrom, dateto, comcode) {
        if (isNullOrUndefined(this.username)) {
            this.username = localStorage.getItem('username');
        }
        this.username = localStorage.getItem('username');
        return this.http.post(this.url + '/delivered', { username: this.username, regdate_from: datefrom, regdate_to: dateto, comcode: comcode }, { headers: this.prepareHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //////////////////////
    StaticService.prototype.prepareHeaders = function () {
        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-auth-token': localStorage.getItem('currentUser')
        });
    };
    StaticService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    StaticService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, Router])
    ], StaticService);
    return StaticService;
}());
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/services/static.service.js.map