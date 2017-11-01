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
/**
 * Created by annakim on 2017. 2. 20..
 */
export var NoticeService = (function () {
    function NoticeService(http, router) {
        this.http = http;
        this.router = router;
        this.url = '/api/notice';
    }
    // 공지사항
    NoticeService.prototype.getNoticeList = function (page) {
        return this.http.post(this.url, { page: page }, { headers: this.prepareHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // 공지사항 상세보기
    NoticeService.prototype.getNotice = function (id) {
        return this.http.get(this.url + '/detail/' + id, { headers: this.prepareHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // 공지사항 추가
    NoticeService.prototype.setNotice = function (notice) {
        return this.http.post(this.url + '/add', JSON.stringify(notice), { headers: this.prepareHeaders() })
            .catch(this.handleError);
    };
    // 공지사항 삭제
    NoticeService.prototype.deleteNotice = function (id) {
        return this.http.post(this.url + '/delete', { id: id }, { headers: this.prepareHeaders() })
            .catch(this.handleError);
    };
    //////////////////////
    NoticeService.prototype.prepareHeaders = function () {
        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-auth-token': localStorage.getItem('currentUser')
        });
    };
    NoticeService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    NoticeService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, Router])
    ], NoticeService);
    return NoticeService;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/services/notice.service.js.map