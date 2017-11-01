"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var rxjs_1 = require("rxjs");
var http_1 = require('@angular/http');
var data_1 = require("./data");
/**
 * Created by annakim on 2017. 2. 20..
 */
var InvoiceService = (function () {
    // private invoices: Invoice[];
    function InvoiceService(http) {
        this.http = http;
        this.invoices = data_1.database;
        this.url = '/api/invoices';
    }
    // 배송정보 목록
    InvoiceService.prototype.getInvoices = function (datefrom, dateto, comcode, level, invoice, fid) {
        return this.http.post(this.url, { regdate_from: datefrom, regdate_to: dateto, comcode: comcode, level: level, invoice: invoice, fid: fid }, { headers: this.prepareHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // 배송정보 상세보기
    InvoiceService.prototype.getDetaInvoices = function (invoice_id) {
        return this.http.post(this.url + '/detail', { invoice_id: invoice_id }, { headers: this.prepareHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // 미배송정보 목록
    InvoiceService.prototype.getInvoicesNotdelivered = function (datefrom, dateto, comcode, level, invoice, fid) {
        return this.http.post(this.url + '/notdelivered', { regdate_from: datefrom, regdate_to: dateto, comcode: comcode, level: level, invoice: invoice, fid: fid }, { headers: this.prepareHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    InvoiceService.prototype.list = function (search, page, limit) {
        // this.getInvoices();
        if (search === void 0) { search = null; }
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        console.log('섭스크라이브' + this.invoices);
        var invoiceResult = this.invoices.filter(function (invoice) {
            return (search) ? invoice.comcode.toLowerCase().indexOf(search) !== -1 : true;
        });
        var invoiceResultPage = invoiceResult.slice((page - 1) * limit, page * limit);
        return rxjs_1.Observable.of({ total: invoiceResult.length, items: invoiceResultPage }).delay(100);
    };
    //////////////////////
    InvoiceService.prototype.prepareHeaders = function () {
        return new http_1.Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-auth-token': localStorage.getItem('jwt')
        });
    };
    InvoiceService.prototype.handleError = function (error) {
        console.error(error);
        return rxjs_1.Observable.throw(error.json().error || 'Server error');
    };
    InvoiceService = __decorate([
        core_1.Injectable()
    ], InvoiceService);
    return InvoiceService;
}());
exports.InvoiceService = InvoiceService;
