var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { NoticeService } from "../../services/notice.service";
import { Notice } from "../../models/notice";
import { Router } from "@angular/router";
import { AlertService } from "../../services/alert.service";
export var NoticeaddComponent = (function () {
    function NoticeaddComponent(noticeService, router, alertService) {
        this.noticeService = noticeService;
        this.router = router;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    NoticeaddComponent.prototype.ngOnInit = function () {
    };
    NoticeaddComponent.prototype.setNotice = function () {
        var _this = this;
        this.loading = true;
        this.noticeService.setNotice(this.model)
            .subscribe(function (data) {
            _this.router.navigate(['/home']);
        }, function (error) {
            _this.alertService.error(error, 'admin');
            _this.loading = false;
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Notice)
    ], NoticeaddComponent.prototype, "notice", void 0);
    NoticeaddComponent = __decorate([
        Component({
            selector: 'app-notice',
            templateUrl: 'noticeadd.component.html',
        }), 
        __metadata('design:paramtypes', [NoticeService, Router, AlertService])
    ], NoticeaddComponent);
    return NoticeaddComponent;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/profile/notice-add/noticeadd.component.js.map