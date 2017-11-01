var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from "@angular/core";
/**
 * Created by annakim on 2017. 4. 19..
 */
export var AddCommaFormat = (function () {
    function AddCommaFormat() {
    }
    AddCommaFormat.prototype.transform = function (value) {
        return value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };
    AddCommaFormat = __decorate([
        Pipe({
            name: 'addcommaformat'
        }), 
        __metadata('design:paramtypes', [])
    ], AddCommaFormat);
    return AddCommaFormat;
}());
export var AddCommaFormatNumber = (function () {
    function AddCommaFormatNumber() {
    }
    AddCommaFormatNumber.prototype.transform = function (value) {
        return String(value).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };
    AddCommaFormatNumber = __decorate([
        Pipe({
            name: 'addcommaformatnumber'
        }), 
        __metadata('design:paramtypes', [])
    ], AddCommaFormatNumber);
    return AddCommaFormatNumber;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/pipe/addcomma.js.map