import {NgModule, ApplicationRef}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing}        from './app.routing';
import {AppComponent}  from './app.component';

// 컴포넌트 및 서비스
import {AlertComponent} from './directives/index';
import {AuthGuard} from './_guards/index';
import {AlertService, AuthenticationService, UserService} from './services/index';
import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';
import {NavigationService} from "./services/navigation.service";
import {ProfileService} from "./services/profile.service";
import {ProfileaboutComponent} from "./profile/profile-about/profileabout.component";
import {ProfileconnectionsComponent} from "./profile/profile-connectoins/profileconnctions.component";
import {HomeComponent} from "./home/home.component";
import {MissingconnectionsComponent} from "./connctions/missingconnctions.component"
import {ProfileaddComponent} from "./profile/profile-add/profileadd.component"
import {StaticComponent} from "./static/static.component";
import {ChangeNumber} from "./connctions/pipe";

//google map
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
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
})

export class AppModule {
}
