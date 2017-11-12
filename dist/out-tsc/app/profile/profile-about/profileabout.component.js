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
export var ProfileaboutComponent = (function () {
    function ProfileaboutComponent(router, profileService, alertService) {
        this.router = router;
        this.profileService = profileService;
        this.alertService = alertService;
        router.events.subscribe(function () {
            localStorage.getItem('email');
            // this.email='demo1@demo.com';
        });
    }
    ProfileaboutComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    ProfileaboutComponent.prototype.getUser = function () {
        var _this = this;
        this.profileService.getUserdetail()
            .subscribe(function (result) {
            _this.user = result['user'];
        }, function (error) {
        });
    };
    ProfileaboutComponent = __decorate([
        Component({
            selector: 'app-profile',
            templateUrl: 'profileabout.component.html',
        }), 
        __metadata('design:paramtypes', [Router, ProfileService, AlertService])
    ], ProfileaboutComponent);
    return ProfileaboutComponent;
}());
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/profile/profile-about/profileabout.component.js.map