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
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";
export var AppComponent = (function () {
    function AppComponent(router, loginService, route) {
        var _this = this;
        this.router = router;
        this.loginService = loginService;
        router.events.subscribe(function () {
            _this.isSignedIn = loginService.isSignedIn();
            _this.username = localStorage.getItem('name');
        });
    }
    AppComponent.prototype.login = function (event, email, password) {
        var _this = this;
        event.preventDefault();
        this.loginService.login(email, password)
            .subscribe(function () {
            _this.router.navigate(['/add']);
        }, this.handleError);
    };
    AppComponent.prototype.logout = function () {
        this.loginService.logout();
        this.router.navigate(['/login']);
    };
    AppComponent.prototype.handleError = function (error) {
        console.log(error.status);
    };
    AppComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'app',
            templateUrl: 'app.component.html',
        }), 
        __metadata('design:paramtypes', [Router, AuthenticationService, ActivatedRoute])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/app.component.js.map