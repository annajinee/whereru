var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { InvoiceService } from "../../services/invoice.service";
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as moment from 'moment';
import { AlertService } from "../../services/alert.service";
import 'eonasdan-bootstrap-datetimepicker';
import 'ng2-eonasdan-datetimepicker';
import 'moment';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
require('moment/locale/fr.js');
export var InvoiceListComponent = (function () {
    function InvoiceListComponent(invoiceservice, router, alertService) {
        var _this = this;
        this.invoiceservice = invoiceservice;
        this.router = router;
        this.alertService = alertService;
        this.loading = false;
        this.searchTermStream = new Subject();
        this.page = 1;
        this.pageStream = new Subject();
        this.index = 0;
        this.cssClass = '';
        this.animation = true;
        this.keyboard = true;
        this.backdrop = true;
        this.css = false;
        router.events.subscribe(function () {
            _this.username = localStorage.getItem('username');
        });
    }
    InvoiceListComponent.prototype.ngOnInit = function () {
        this.date = moment();
        this.a2eOptions = {
            dayViewHeaderFormat: 'YYYY년 MM월',
            format: 'YYYY-MM-DD HH:mm',
            locale: 'ko',
            maxDate: this.getMaxDate(),
            minDate: this.getMinDate(),
            showClose: true,
            useCurrent: false,
            tooltips: {
                today: '당일',
                clear: '선택 지우기',
                close: '창 닫기',
                selectMonth: '월 선택',
                prevMonth: '이전 달',
                nextMonth: '다음 달',
                selectYear: '년 선택',
                prevYear: '이전 년도',
                nextYear: '다음 년도',
                selectTime: '시간 선택'
            }
        };
        this.getComcodes();
        this.getInvoices(this.page, this.datefrom, this.dateto, this.comcode, this.level, this.invoice, this.fid);
    };
    InvoiceListComponent.prototype.getMinDate = function () {
        var datetime = new Date();
        var mindate = new Date();
        if (!this.datefrom) {
            return moment(mindate.setDate(datetime.getDate() - 30)).format('YYYY-MM-DD');
        }
    };
    InvoiceListComponent.prototype.getMaxDate = function () {
        var datetime = new Date();
        if (!this.dateto) {
            return datetime;
        }
    };
    InvoiceListComponent.prototype.getFromDate = function () {
        var datetime = new Date();
        var yesterday = new Date();
        if (!this.datefrom) {
            return moment(yesterday.setDate(datetime.getDate())).format('YYYY-MM-DD 00:00');
        }
    };
    InvoiceListComponent.prototype.getToDate = function () {
        var datetime = new Date();
        if (!this.dateto) {
            return moment(datetime.setDate(datetime.getDate())).format('YYYY-MM-DD hh:mm');
        }
    };
    // 페이징
    InvoiceListComponent.prototype.search = function (terms) {
        this.searchTermStream.next(terms);
    };
    // 모달
    InvoiceListComponent.prototype.closed = function () {
        this.output = '(closed) ' + this.selected;
    };
    InvoiceListComponent.prototype.dismissed = function () {
        this.output = '(dismissed)';
    };
    InvoiceListComponent.prototype.opened = function () {
        this.output = '(opened)';
    };
    InvoiceListComponent.prototype.open = function () {
        this.modal.open();
    };
    InvoiceListComponent.prototype.getComcodes = function () {
        var _this = this;
        this.invoiceservice.getComcodeList()
            .subscribe(function (invoicecomcodes) { return _this.invoicecomcodes = invoicecomcodes; });
    };
    InvoiceListComponent.prototype.setfirstpage = function () {
        this.page = 0;
    };
    InvoiceListComponent.prototype.getInvoices = function (page, datefrom, dateto, comcode, level, invoice, fid) {
        var _this = this;
        if (datefrom > dateto) {
            alert("조회기간을 다시 설정 해 주세요.");
        }
        else {
            this.loading = true;
            this.invoiceservice.getInvoices(page, datefrom, dateto, comcode, level, invoice, fid)
                .subscribe(function (result) {
                _this.invoices = result['content'];
                _this.totalPages = result['totalPages'];
                _this.totalElements = result['totalElements'];
                _this.last = result['last'];
                _this.size = result['size'];
                _this.number = result['number'];
                _this.numberOfElements = result['numberOfElements'];
                _this.page = result['number'];
                _this.total$ = Observable.of(_this.totalElements); //총 갯수
                _this.loading = false;
            }, function (error) {
                _this.alertService.error(error, 'user');
                _this.loading = false;
            });
        }
    };
    // 배송정보 상세보기
    InvoiceListComponent.prototype.gotoDetail = function (invoice) {
        var _this = this;
        this.invoice_invoice = invoice.invoice; // 운송장
        this.invoice_comcodename = invoice.comcodename; // 배송사
        this.invoice_itemname = invoice.itemname; //상품정보
        this.invoice_sendername = invoice.sendername; // 보내는 분
        this.invoice_receiverame = invoice.receivername; // 받는 분
        this.invoice_recipent = invoice.recipent; // 수령인
        this.invoiceservice.getDetaInvoices(invoice.id)
            .subscribe(function (invoicesDetail) { return _this.invoicesDetail = invoicesDetail; });
        this.modal.open();
    };
    // 배송정보 다운로드
    InvoiceListComponent.prototype.download = function (datefrom, dateto, comcode, level, invoice, fid) {
        var _this = this;
        this.invoiceservice.getInvoicesdownload(datefrom, dateto, comcode, level, invoice, fid)
            .subscribe(function (result) {
            _this.filelist = result;
            var data = [];
            for (var i in _this.filelist) {
                var levelConvert = "";
                var regdateConvert = "";
                if (_this.filelist[i].level == "1") {
                    levelConvert = "배송준비";
                }
                else if (_this.filelist[i].level == "2") {
                    levelConvert = "집화완료";
                }
                else if (_this.filelist[i].level == "3") {
                    levelConvert = "배송진행중";
                }
                else if (_this.filelist[i].level == "4") {
                    levelConvert = "지점도착";
                }
                else if (_this.filelist[i].level == "5") {
                    levelConvert = "배송출발";
                }
                else if (_this.filelist[i].level == "6") {
                    levelConvert = "배송완료";
                }
                else if (_this.filelist[i].level == "0" || _this.filelist[i].level == "") {
                    levelConvert = "-";
                }
                if (_this.filelist[i].regdate) {
                    regdateConvert = _this.filelist[i].regdate.substring(0, 19);
                }
                data.push({
                    '': Number(i) + 1,
                    운송장번호: _this.filelist[i].invoice,
                    배송사: _this.filelist[i].comcodename,
                    배송상태: levelConvert,
                    등록일: regdateConvert
                });
            }
            data.splice(data.length - 5, data.length);
            var options = {
                showLabels: true,
                showTitle: false
            };
            var timestamp = _this.getDateTime();
            new Angular2Csv(data, 'tracking_list_' + timestamp, options);
        }, function (error) {
            _this.alertService.error(error, 'user');
            _this.loading = false;
        });
    };
    InvoiceListComponent.prototype.getDateTime = function () {
        var datetime = new Date();
        if (!this.dateto) {
            return moment(datetime).format('YYYYMMDDHHmmss');
        }
    };
    __decorate([
        ViewChild('modal'), 
        __metadata('design:type', ModalComponent)
    ], InvoiceListComponent.prototype, "modal", void 0);
    InvoiceListComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'invoice-list',
            templateUrl: 'invoices-list.component.html',
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [InvoiceService, Router, AlertService])
    ], InvoiceListComponent);
    return InvoiceListComponent;
}());
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/invoices/invoices-list/invoices-list.component.js.map