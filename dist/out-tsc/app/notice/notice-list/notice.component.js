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
import { NoticeService } from "../../services/notice.service";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { AlertService } from "../../services/alert.service";
export var NoticeComponent = (function () {
    function NoticeComponent(noticeService, router, alertService) {
        var _this = this;
        this.noticeService = noticeService;
        this.router = router;
        this.alertService = alertService;
        this.loading = false;
        this.searchTermStream = new Subject();
        this.page = 1;
        this.admin = false;
        router.events.subscribe(function () {
            _this.username = localStorage.getItem('username');
            if (_this.username == "sweettracker") {
                _this.admin = true;
            }
        });
    }
    NoticeComponent.prototype.ngOnInit = function () {
        this.getNotice(this.page);
    };
    NoticeComponent.prototype.getNotice = function (page) {
        var _this = this;
        this.loading = true;
        this.noticeService.getNoticeList(page)
            .subscribe(function (result) {
            _this.notices = result['content'];
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
    };
    // 공지사항 상세보기
    NoticeComponent.prototype.gotoDetail = function (notice) {
        var link = ['/notice/detail', notice.id];
        this.router.navigate(link);
    };
    // 페이징
    NoticeComponent.prototype.search = function (terms) {
        this.searchTermStream.next(terms);
    };
    NoticeComponent = __decorate([
        Component({
            selector: 'app-notice',
            templateUrl: 'notice.component.html',
        }), 
        __metadata('design:paramtypes', [NoticeService, Router, AlertService])
    ], NoticeComponent);
    return NoticeComponent;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/notice/notice-list/notice.component.js.map