import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from "./_guards/auth.guard";
import { HomeComponent } from "./home/home.component";
import { Observable } from "rxjs";
import { NavigationService } from "./services/navigation.service";
import { ProfileaboutComponent } from "./profile/profile-about/profileabout.component";
import { ProfileconnectionsComponent } from "./profile/profile-connectoins/profileconnctions.component";
import { StaticComponent } from "./static/static.component";
import { MissingconnectionsComponent } from "./connctions/missingconnctions.component";
import { ProfileaddComponent } from "./profile/profile-add/profileadd.component";
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
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], canDeactivate: [NavigationService] },
    { path: 'login', component: LoginComponent, canDeactivate: [NavigationService] },
    { path: 'register', component: RegisterComponent, canDeactivate: [NavigationService] },
    { path: 'profile/about', component: ProfileaboutComponent, canActivate: [AuthGuard], canDeactivate: [NavigationService] },
    { path: 'profile/add', component: ProfileaddComponent, canDeactivate: [NavigationService] },
    { path: 'profile/connections', component: ProfileconnectionsComponent, canActivate: [AuthGuard], canDeactivate: [NavigationService] },
    { path: 'connections/missing', component: MissingconnectionsComponent, canActivate: [AuthGuard], canDeactivate: [NavigationService] },
    { path: 'static', component: StaticComponent, canDeactivate: [NavigationService] },
    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];
export var routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/app.routing.js.map