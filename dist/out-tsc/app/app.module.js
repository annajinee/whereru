var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MomentModule } from 'angular2-moment';
import { AlertComponent } from './directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { StaticService } from "./services/static.service";
import { ChartModule } from 'angular2-chartjs';
import { DateTimePickerDirective } from "ng2-eonasdan-datetimepicker/dist/datetimepicker.directive";
import { NoticeService } from "./services/notice.service";
import { NavigationService } from "./services/navigation.service";
import { InvoiceService } from "./services/invoice.service";
import { ProfileaboutComponent } from "./profile/profile-about/profileabout.component";
import { ProfileconnectionsComponent } from "./profile/profile-connectoins/profileconnctions.component";
import { HomeComponent } from "./home/home.component";
import { NewsComponent } from "./news/news.component";
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [
                BrowserModule,
                FormsModule,
                HttpModule,
                routing,
                MomentModule,
                ChartModule,
                Ng2Bs3ModalModule
            ],
            declarations: [
                AppComponent,
                AlertComponent,
                LoginComponent,
                RegisterComponent,
                HomeComponent,
                DateTimePickerDirective,
                ProfileaboutComponent,
                ProfileconnectionsComponent,
                NewsComponent
            ],
            providers: [
                AuthGuard,
                AlertService,
                AuthenticationService,
                UserService,
                InvoiceService,
                StaticService,
                NoticeService,
                NavigationService
            ],
            bootstrap: [AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/app.module.js.map