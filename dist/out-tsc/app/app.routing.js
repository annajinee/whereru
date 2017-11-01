import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from "./home/home.component";
import { Observable } from "rxjs";
import { NavigationService } from "./services/navigation.service";
import { ProfileaboutComponent } from "./profile/profile-about/profileabout.component";
import { ProfileconnectionsComponent } from "./profile/profile-connectoins/profileconnctions.component";
import { NewsComponent } from "./news/news.component";
export var RouteComponent = (function () {
    function RouteComponent(changeRef, appRef) {
        this.changeRef = changeRef;
        this.appRef = appRef;
        this.hasChanges = true;
    }
    RouteComponent.prototype.canDeactivate = function () {
        console.log("Detecting changes. Has Changes: " + this.hasChanges);
        return Observable.of(!this.hasChanges);
    };
    RouteComponent.prototype.ngOnInit = function () {
    };
    return RouteComponent;
}());
var appRoutes = [
    { path: 'home', component: HomeComponent, canDeactivate: [NavigationService] },
    { path: 'login', component: LoginComponent, canDeactivate: [NavigationService] },
    { path: 'register', component: RegisterComponent, canDeactivate: [NavigationService] },
    { path: 'news', component: NewsComponent, canDeactivate: [NavigationService] },
    { path: 'profile/about', component: ProfileaboutComponent, canDeactivate: [NavigationService] },
    { path: 'profile/connections', component: ProfileconnectionsComponent, canDeactivate: [NavigationService] },
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];
export var routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/app.routing.js.map