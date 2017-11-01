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
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../services/alert.service";
export var NoticedetailComponent = (function () {
    function NoticedetailComponent(noticeService, route, router, alertService) {
        var _this = this;
        this.noticeService = noticeService;
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.loading = false;
        this.admin = false;
        router.events.subscribe(function () {
            _this.username = localStorage.getItem('username');
            if (_this.username == "sweettracker") {
                _this.admin = true;
            }
        });
    }
    NoticedetailComponent.prototype.ngOnInit = function () {
        this.getNotice(this.id);
    };
    // 공지사항 상세
    NoticedetailComponent.prototype.getNotice = function (id) {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id_1 = +params['id'];
                _this.noticeService.getNotice(id_1).subscribe(function (notice) { return _this.notice = notice; });
            }
        });
    };
    // 공지사항 삭제
    NoticedetailComponent.prototype.delete = function (id) {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id'] !== undefined) {
                var id_2 = +params['id'];
                _this.noticeService.deleteNotice(id_2).subscribe(function (notice) { return _this.notice = notice; });
            }
        });
        alert('해당 공지사항을 삭제하였습니다');
        this.router.navigate(['/home']);
    };
    NoticedetailComponent = __decorate([
        Component({
            selector: 'app-notice',
            templateUrl: 'noticedetail.component.html',
        }), 
        __metadata('design:paramtypes', [NoticeService, ActivatedRoute, Router, AlertService])
    ], NoticedetailComponent);
    return NoticedetailComponent;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/notice/notice-detail/noticedetail.component.js.map