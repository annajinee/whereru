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
import { Router } from '@angular/router';
import { AlertService, UserService } from '../services/index';
export var RegisterComponent = (function () {
    function RegisterComponent(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
        this.admin = false;
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        this.userService.createUser(this.model)
            .subscribe(function (data) {
            alert('사용자를 등록하였습니다');
            _this.router.navigate(['/home']);
        }, function (error) {
            alert('사용자 등록실패' + error);
            _this.alertService.error(error, 'admin');
            _this.loading = false;
        });
    };
    RegisterComponent = __decorate([
        Component({
            moduleId: module.id,
            templateUrl: 'register.component.html'
        }), 
        __metadata('design:paramtypes', [Router, UserService, AlertService])
    ], RegisterComponent);
    return RegisterComponent;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/register/register.component.js.map