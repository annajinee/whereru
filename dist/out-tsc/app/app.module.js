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
import { AlertComponent } from './directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { NavigationService } from "./services/navigation.service";
import { ProfileService } from "./services/profile.service";
import { ProfileaboutComponent } from "./profile/profile-about/profileabout.component";
import { ProfileconnectionsComponent } from "./profile/profile-connectoins/profileconnctions.component";
import { HomeComponent } from "./home/home.component";
import { MissingconnectionsComponent } from "./connctions/missingconnctions.component";
import { ProfileaddComponent } from "./profile/profile-add/profileadd.component";
import { StaticComponent } from "./static/static.component";
import { ChangeNumber } from "./connctions/pipe";
import { AgmCoreModule } from 'angular2-google-maps/core';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [
                BrowserModule,
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCQwmBzHNsh5UHHf2VDkqieweXlwSEkKW0'
                }),
                FormsModule,
                HttpModule,
                routing,
            ],
            declarations: [
                AppComponent,
                AlertComponent,
                LoginComponent,
                RegisterComponent,
                HomeComponent,
                ProfileaboutComponent,
                ProfileconnectionsComponent,
                MissingconnectionsComponent,
                ProfileaddComponent,
                StaticComponent,
                ChangeNumber
            ],
            providers: [
                AuthGuard,
                AlertService,
                AuthenticationService,
                UserService,
                NavigationService,
                ProfileService
            ],
            bootstrap: [AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/app.module.js.map