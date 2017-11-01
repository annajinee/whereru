var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import * as moment from 'moment';
import { StaticService } from "../../services/static.service";
import { InvoiceService } from "../../services/invoice.service";
export var TrackingComponent = (function () {
    function TrackingComponent(invoiceservice, staticservice) {
        this.invoiceservice = invoiceservice;
        this.staticservice = staticservice;
        this.invoices = [];
        this.cnt = [];
        this.date = [];
        this.loading = false;
        this.datasetiszero = false;
    }
    TrackingComponent.prototype.ngOnInit = function () {
        this.a2edate = moment();
        this.a2eOptions = {
            dayViewHeaderFormat: 'YYYY년 MM월',
            format: 'YYYY-MM-DD',
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
        this.getTrackingStaticList(this.datefrom, this.dateto, this.comcode);
    };
    TrackingComponent.prototype.getComcodes = function () {
        var _this = this;
        this.invoiceservice.getComcodeList()
            .subscribe(function (invoicecomcodes) { return _this.invoicecomcodes = invoicecomcodes; });
    };
    TrackingComponent.prototype.getTrackingStaticList = function (datefrom, dateto, comcode) {
        var _this = this;
        if (datefrom > dateto) {
            alert("조회기간을 다시 설정 해 주세요.");
        }
        else {
            this.invoices = [];
            this.cnt = [];
            this.date = [];
            this.loading = true;
            this.staticservice.getTrackingStaticList(datefrom, dateto, comcode)
                .subscribe(function (result) {
                _this.statics = result;
                for (var i in _this.statics) {
                    if (_this.statics[i].invoice) {
                        _this.invoices.push(_this.statics[i].invoice);
                        _this.cnt.push(_this.statics[i].cnt);
                        _this.date.push(_this.statics[i].regdate);
                    }
                }
                if (_this.date.length == 1 && _this.cnt.length == 1 && _this.invoices.length == 1) {
                    _this.date.unshift('');
                    _this.cnt.unshift('0');
                    _this.invoices.unshift(0);
                    _this.date.push('');
                    _this.cnt.push('0');
                    _this.invoices.push(0);
                }
                //총 갯수
                _this.total_invoices = Number(_this.invoices.reduce(_this.add, 0));
                _this.total_cnt = Number(_this.cnt.reduce(_this.add, 0));
                _this.type = 'line';
                _this.data = {
                    labels: _this.date,
                    datasets: [
                        {
                            label: "운송장",
                            data: _this.cnt,
                            fill: false,
                            position: 'bottom',
                            backgroundColor: "#ff913f",
                            borderColor: '#ff913f'
                        },
                        {
                            label: "전체",
                            data: _this.invoices,
                            fill: false,
                            position: 'bottom',
                            backgroundColor: "#16bcd4",
                            borderColor: '#16bcd4'
                        }
                    ]
                };
                if (_this.date.length == 0) {
                    _this.datasetiszero = true;
                    _this.optionszero = {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: true,
                            labels: {
                                fontColor: '#2b343a',
                                fontSize: 12,
                                padding: 20
                            }
                        },
                        title: {
                            display: true,
                            text: '추적 건수',
                            fontColor: '#2b343a',
                            fontSize: 16
                        },
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        max: 10,
                                        min: 0,
                                        stepSize: 1,
                                        beginAtZero: true
                                    }
                                }]
                        }
                    };
                }
                else {
                    _this.datasetiszero = false;
                    _this.options = {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: true,
                            labels: {
                                fontColor: '#2b343a',
                                fontSize: 12,
                                padding: 15
                            }
                        },
                        title: {
                            display: true,
                            text: '추적 건수',
                            fontColor: '#2b343a',
                            fontSize: 16
                        },
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                        }
                    };
                }
                _this.loading = false;
            });
        } // 날짜 설정 else 구문 종료
    };
    TrackingComponent.prototype.getMinDate = function () {
        var datetime = new Date();
        var mindate = new Date();
        if (!this.datefrom) {
            return moment(mindate.setDate(datetime.getDate() - 100)).format('YYYY-MM-DD');
        }
    };
    TrackingComponent.prototype.getMaxDate = function () {
        var datetime = new Date();
        var yesterday = new Date();
        if (!this.datefrom) {
            return moment(yesterday.setDate(datetime.getDate() - 1)).format('YYYY-MM-DD');
        }
    };
    TrackingComponent.prototype.getFromDate = function () {
        var datetime = new Date();
        var yesterday = new Date();
        if (!this.datefrom) {
            return moment(yesterday.setDate(datetime.getDate() - 1)).format('YYYY-MM-DD');
        }
    };
    TrackingComponent.prototype.getToDate = function () {
        var datetime = new Date();
        var yesterday = new Date();
        if (!this.datefrom) {
            return moment(yesterday.setDate(datetime.getDate() - 1)).format('YYYY-MM-DD');
        }
    };
    TrackingComponent.prototype.add = function (a, b) {
        return parseInt(a) + parseInt(b);
    };
    TrackingComponent = __decorate([
        Component({
            selector: 'app-tracking',
            templateUrl: 'tracking.component.html'
        }), 
        __metadata('design:paramtypes', [InvoiceService, StaticService])
    ], TrackingComponent);
    return TrackingComponent;
}());
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/statics/tracking/tracking.component.js.map