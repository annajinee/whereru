var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Output, Input } from '@angular/core';
export var PaginationComponent = (function () {
    function PaginationComponent() {
        this.total = 0;
        this.page = 0;
        this.goTo = new EventEmitter();
        this.from = 1;
    }
    PaginationComponent.prototype.totalPages = function () {
        return Math.ceil(this.total / 10);
    };
    PaginationComponent.prototype.prevPage = function () {
        return Math.max(1, this.page - 9); // 페이지 이전으로 //10페이지씩
        // return Math.max(1, this.page ); // 페이지 이전으로
    };
    PaginationComponent.prototype.pageFirst = function () {
        return Math.max(1, -1); // 페이지 처음으로 (0페이지 부터 시작 -> 화면은 1로 ...-1해야함)
    };
    PaginationComponent.prototype.pageLast = function () {
        return Math.min(this.totalPages(), this.totalPages()); //페이지 마지막으로
    };
    PaginationComponent.prototype.nextPage = function () {
        return Math.min(this.totalPages(), this.page + 11);
        // return Math.min(this.totalPages(),this.page + 2);
    };
    PaginationComponent.prototype.pageClicked = function (page) {
        this.goTo.next(page);
    };
    PaginationComponent.prototype.pagesRange = function () {
        if (this.totalPages() <= 10) {
            return this.range(this.from, this.totalPages() + 1);
        }
        else {
            // more than 10 total pages so calculate start and end pages
            if (this.page <= 6) {
                this.from = 1;
                this.to = 10;
                return this.range(this.from, this.to);
            }
            else if (this.page + 4 >= this.totalPages() + 1) {
                this.from = this.totalPages() - 9;
                this.to = this.totalPages() + 1;
                return this.range(this.from, this.to);
            }
            else {
                this.from = this.page - 5;
                this.to = this.page + 4;
                return this.range(this.from, this.to);
            }
        }
    };
    PaginationComponent.prototype.range = function (start, stop, step) {
        if (step === void 0) { step = 1; }
        if (!stop) {
            start = 0;
            stop = start;
        }
        return Array.from(new Array(Number((stop - start) / step)), function (x, i) { return start + i * step; });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "total", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "page", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], PaginationComponent.prototype, "goTo", void 0);
    PaginationComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'pagination',
            templateUrl: 'pagination.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], PaginationComponent);
    return PaginationComponent;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/pagination/pagination.component.js.map