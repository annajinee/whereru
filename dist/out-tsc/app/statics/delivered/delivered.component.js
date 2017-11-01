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
export var DeliveredComponent = (function () {
    function DeliveredComponent(invoiceservice, staticservice) {
        this.invoiceservice = invoiceservice;
        this.staticservice = staticservice;
        this.invoices_total = [];
        this.invoices_4days = [];
        this.invoices_3days = [];
        this.invoices_2days = [];
        this.invoices_1days = [];
        this.invoices_alldays = [];
        this.date = [];
        this.uniquedate = [];
        this.loading = false;
        this.datasetiszero = false;
    }
    DeliveredComponent.prototype.ngOnInit = function () {
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
    DeliveredComponent.prototype.getComcodes = function () {
        var _this = this;
        this.invoiceservice.getComcodeList()
            .subscribe(function (invoicecomcodes) { return _this.invoicecomcodes = invoicecomcodes; });
    };
    DeliveredComponent.prototype.getTrackingStaticList = function (datefrom, dateto, comcode) {
        var _this = this;
        if (datefrom > dateto) {
            alert("조회기간을 다시 설정 해 주세요.");
        }
        else {
            this.invoices_4days = [];
            this.invoices_3days = [];
            this.invoices_2days = [];
            this.invoices_1days = [];
            this.invoices_total = [];
            this.invoices_alldays = [];
            this.date = [];
            this.uniquedate = [];
            this.total = 0;
            this.loading = true;
            var start;
            this.staticservice.getTrackingDeliveryStaticList(datefrom, dateto, comcode)
                .subscribe(function (result) {
                _this.statics = result;
                // alert('길이'+this.statics.length+' , rsult:'+result);
                if (_this.statics.length == 0) {
                    _this.date.unshift('');
                    _this.invoices_1days.unshift(0);
                    _this.invoices_2days.unshift(0);
                    _this.invoices_3days.unshift(0);
                    _this.invoices_4days.unshift(0);
                    _this.loading = false;
                }
                else if (_this.statics.length >= 1) {
                    for (var i in _this.statics) {
                        // 1일~4일중 데이터 날짜 중복 제거 후 담기
                        // if (this.date.indexOf(this.statics[i].regdate) == -1 && this.statics[i].regdate != '') {
                        //   if (this.statics[i].delivery_period && this.statics[i].invoice) {
                        //     this.date.push(this.statics[i].regdate);
                        //   }
                        // }
                        if (_this.statics[0].delivery_period == "4") {
                            start = 4;
                        }
                        else if (_this.statics[0].delivery_period == "3") {
                            start = 3;
                        }
                        else if (_this.statics[0].delivery_period == "2") {
                            start = 2;
                        }
                        if (_this.statics[i].delivery_period == "1") {
                            _this.invoices_1days.push(_this.statics[i].invoice);
                            _this.date.push(_this.statics[i].regdate);
                        }
                        else if (_this.statics[i].delivery_period == "2") {
                            _this.invoices_2days.push(_this.statics[i].invoice);
                        }
                        else if (_this.statics[i].delivery_period == "3") {
                            _this.invoices_3days.push(_this.statics[i].invoice);
                        }
                        else if (_this.statics[i].delivery_period == "4") {
                            _this.invoices_4days.push(_this.statics[i].invoice);
                        }
                        // 총 갯수
                        if (_this.statics[i].invoice) {
                            _this.invoices_total.push(_this.statics[i].invoice);
                        }
                    } // for문 종료
                }
                // 그래프 밀림 방지
                if (start == 4) {
                    _this.invoices_4days.shift();
                    _this.invoices_3days.shift();
                    _this.invoices_4days.shift();
                    _this.invoices_2days.shift();
                    _this.invoices_3days.shift();
                    _this.invoices_4days.shift();
                }
                else if (start == 3) {
                    _this.invoices_3days.shift();
                    _this.invoices_4days.shift();
                    _this.invoices_2days.shift();
                    _this.invoices_3days.shift();
                    _this.invoices_4days.shift();
                }
                else if (start == 2) {
                    _this.invoices_2days.shift();
                    _this.invoices_3days.shift();
                    _this.invoices_4days.shift();
                }
                // console.log('1일:' + this.invoices_1days.length + ' , 2일:' + this.invoices_2days.length + " ,3일:" + this.invoices_3days.length + ",4일" + this.invoices_4days.length);
                if (_this.date.length == 1) {
                    _this.date.unshift('');
                    _this.invoices_1days.unshift(0);
                    _this.invoices_2days.unshift(0);
                    _this.invoices_3days.unshift(0);
                    _this.invoices_4days.unshift(0);
                    _this.date.push('');
                    _this.invoices_1days.push(0);
                    _this.invoices_2days.push(0);
                    _this.invoices_3days.push(0);
                    _this.invoices_4days.push(0);
                }
                var lastindex = _this.date.length - 1;
                // console.log('검색일 : ' + datefrom + '~' + dateto + ' 데이터 존재 마지막 date :' + this.date[lastindex] + '첨' + this.date[0]);
                // 그래프에서 데이터가 없을경우 0으로 마무리 하기위해 1~4일 기간 중 데이터의 최대 길이 구함
                var dayslength = [_this.invoices_1days.length, _this.invoices_2days.length, _this.invoices_3days.length, _this.invoices_4days.length];
                if (_this.invoices_4days.length < Math.max.apply(null, dayslength)) {
                    _this.invoices_4days.push(0);
                }
                if (_this.invoices_3days.length < Math.max.apply(null, dayslength)) {
                    _this.invoices_3days.push(0);
                }
                if (_this.invoices_2days.length < Math.max.apply(null, dayslength)) {
                    _this.invoices_2days.push(0);
                }
                if (_this.invoices_1days.length < Math.max.apply(null, dayslength)) {
                    _this.invoices_1days.push(0);
                }
                //총 갯수
                _this.total = Number(_this.invoices_total.reduce(_this.add, 0));
                // 등록일 +x일에 배송완료 배송률
                _this.deliverypercent_1day = Math.round((Number(_this.invoices_1days.reduce(_this.add, 0)) / _this.total) * 100);
                _this.deliverypercent_2day = Math.round((Number(_this.invoices_2days.reduce(_this.add, 0)) / _this.total) * 100);
                _this.deliverypercent_3day = Math.round((Number(_this.invoices_3days.reduce(_this.add, 0)) / _this.total) * 100);
                _this.deliverypercent_4day = Math.round((Number(_this.invoices_4days.reduce(_this.add, 0)) / _this.total) * 100);
                _this.type = 'line';
                _this.data = {
                    labels: _this.date,
                    datasets: [
                        {
                            label: "1일",
                            data: _this.invoices_1days,
                            fill: false,
                            backgroundColor: "#ff913f",
                            borderColor: '#ff913f'
                        },
                        {
                            label: "2일",
                            data: _this.invoices_2days,
                            fill: false,
                            backgroundColor: "#f5ca3c",
                            borderColor: '#f5ca3c'
                        },
                        {
                            label: "3일",
                            data: _this.invoices_3days,
                            fill: false,
                            backgroundColor: "#97cd57",
                            borderColor: '#97cd57'
                        },
                        {
                            label: "4일 이상",
                            data: _this.invoices_4days,
                            fill: false,
                            backgroundColor: "#16bcd4",
                            borderColor: '#16bcd4'
                        },
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
                                padding: 15
                            }
                        },
                        title: {
                            display: true,
                            text: '배송율',
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
                                padding: 20
                            }
                        },
                        title: {
                            display: true,
                            text: '배송율',
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
                console.log('dataleg' + _this.date.length);
            });
        } // 날짜 설정 else구문 종료
    };
    DeliveredComponent.prototype.add = function (a, b) {
        return parseInt(a) + parseInt(b);
    };
    DeliveredComponent.prototype.getMinDate = function () {
        var datetime = new Date();
        var mindate = new Date();
        if (!this.datefrom) {
            return moment(mindate.setDate(datetime.getDate() - 100)).format('YYYY-MM-DD');
        }
    };
    DeliveredComponent.prototype.getMaxDate = function () {
        var datetime = new Date();
        var yesterday = new Date();
        if (!this.dateto) {
            return moment(yesterday.setDate(datetime.getDate() - 2)).format('YYYY-MM-DD');
        }
    };
    DeliveredComponent.prototype.getFromDate = function () {
        var datetime = new Date();
        var yesterday = new Date();
        if (!this.datefrom) {
            return moment(yesterday.setDate(datetime.getDate() - 8)).format('YYYY-MM-DD');
        }
    };
    DeliveredComponent.prototype.getToDate = function () {
        var datetime = new Date();
        var yesterday = new Date();
        if (!this.dateto) {
            return moment(yesterday.setDate(datetime.getDate() - 2)).format('YYYY-MM-DD');
        }
    };
    DeliveredComponent = __decorate([
        Component({
            selector: 'app-delivered',
            templateUrl: 'delivered.component.html'
        }), 
        __metadata('design:paramtypes', [InvoiceService, StaticService])
    ], DeliveredComponent);
    return DeliveredComponent;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/statics/delivered/delivered.component.js.map