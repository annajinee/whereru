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
import { Subject } from "rxjs";
import { AlertService } from "../../services/alert.service";
export var profileaboutComponent = (function () {
    function profileaboutComponent(noticeService, router, alertService) {
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
    profileaboutComponent = __decorate([
        Component({
            selector: 'app-notice',
            templateUrl: 'profile.component.html',
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof NoticeService !== 'undefined' && NoticeService) === 'function' && _a) || Object, Router, (typeof (_b = typeof AlertService !== 'undefined' && AlertService) === 'function' && _b) || Object])
    ], profileaboutComponent);
    return profileaboutComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/profile/profile.component.js.map