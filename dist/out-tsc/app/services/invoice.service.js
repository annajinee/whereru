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
export var InvoiceService = (function () {
    function InvoiceService(http, router) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.url = '/api/invoices';
        router.events.subscribe(function () {
            _this.username = localStorage.getItem('username');
        });
    }
    // 배송정보 목록
    InvoiceService.prototype.getInvoices = function (page, datefrom, dateto, comcode, level, invoice, fid) {
        if (isNullOrUndefined(this.username)) {
            this.username = localStorage.getItem('username');
        }
        return this.http.post(this.url, {
            username: this.username,
            page: page,
            regdate_from: datefrom,
            regdate_to: dateto,
            comcode: comcode,
            level: level,
            invoice: invoice,
            fid: fid
        }, { headers: this.prepareHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // 배송정보 상세보기
    InvoiceService.prototype.getDetaInvoices = function (invoice_id) {
        if (isNullOrUndefined(this.username)) {
            this.username = localStorage.getItem('username');
        }
        return this.http.post(this.url + '/detail', { invoice_id: invoice_id }, { headers: this.prepareHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // 미배송정보 목록
    InvoiceService.prototype.getInvoicesNotdelivered = function (page, datefrom, dateto, comcode, level, period) {
        if (isNullOrUndefined(this.username)) {
            this.username = localStorage.getItem('username');
        }
        return this.http.post(this.url + '/notdelivered', {
            username: this.username,
            page: page,
            regdate_from: datefrom,
            regdate_to: dateto,
            comcode: comcode,
            level: level,
            period: period
        }, { headers: this.prepareHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // 배송정보 다운로드
    InvoiceService.prototype.getInvoicesdownload = function (datefrom, dateto, comcode, level, invoice, fid) {
        if (isNullOrUndefined(this.username)) {
            this.username = localStorage.getItem('username');
        }
        return this.http.post('/api/invoices/download', {
            username: this.username,
            regdate_from: datefrom,
            regdate_to: dateto,
            comcode: comcode,
            level: level,
            invoice: invoice,
            fid: fid
        }, { headers: this.prepareHeadersFile() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // 미배송정보 다운로드
    InvoiceService.prototype.getInvoicesNotdelivereddownload = function (datefrom, dateto, comcode, level, period) {
        if (isNullOrUndefined(this.username)) {
            this.username = localStorage.getItem('username');
        }
        return this.http.post('/api/invoices/download/notdelivered', {
            username: this.username,
            regdate_from: datefrom,
            regdate_to: dateto,
            comcode: comcode,
            level: level,
            period: period
        }, { headers: this.prepareHeadersFile() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    InvoiceService.prototype.getComcodeList = function () {
        return this.http.post(this.url + '/comcode', {}, { headers: this.prepareHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //////////////////////
    InvoiceService.prototype.prepareHeaders = function () {
        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-auth-token': localStorage.getItem('currentUser')
        });
    };
    InvoiceService.prototype.prepareHeadersFile = function () {
        return new Headers({
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json;charset=utf-8',
            'x-auth-token': localStorage.getItem('currentUser')
        });
    };
    InvoiceService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    InvoiceService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, Router])
    ], InvoiceService);
    return InvoiceService;
}());
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/services/invoice.service.js.map