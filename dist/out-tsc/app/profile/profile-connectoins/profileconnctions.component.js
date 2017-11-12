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
import { Router } from "@angular/router";
import { AlertService } from "../../services/alert.service";
import { ProfileService } from "../../services/profile.service";
export var ProfileconnectionsComponent = (function () {
    function ProfileconnectionsComponent(router, profileService, alertService) {
        this.router = router;
        this.profileService = profileService;
        this.alertService = alertService;
        router.events.subscribe(function () {
            localStorage.getItem('email');
            // this.email='demo1@demo.com';
        });
    }
    ProfileconnectionsComponent.prototype.ngOnInit = function () {
        this.getUser();
        this.getUserDetail();
    };
    ProfileconnectionsComponent.prototype.getUser = function () {
        var _this = this;
        this.profileService.getUsers()
            .subscribe(function (result) {
            _this.user = result['users'];
        }, function (error) {
        });
    };
    ProfileconnectionsComponent.prototype.getUserDetail = function () {
        var _this = this;
        this.profileService.getUserdetail()
            .subscribe(function (result) {
            _this.userDetail = result['user'];
        }, function (error) {
        });
    };
    ProfileconnectionsComponent = __decorate([
        Component({
            selector: 'app-profile',
            templateUrl: 'profileconnections.component.html',
        }), 
        __metadata('design:paramtypes', [Router, ProfileService, AlertService])
    ], ProfileconnectionsComponent);
    return ProfileconnectionsComponent;
}());
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/profile/profile-connectoins/profileconnctions.component.js.map