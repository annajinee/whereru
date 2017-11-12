import {Routes, RouterModule} from '@angular/router';
// import {HomeComponent} from './home/index';
import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';
// import {AuthGuard} from './_guards/index';
import {AuthGuard} from "./_guards/auth.guard";
import {HomeComponent} from "./home/home.component"
import {OnInit, ChangeDetectorRef, ApplicationRef} from "@angular/core";
import {Observable} from "rxjs";
import {NavigationService} from "./services/navigation.service";
import {ProfileaboutComponent} from "./profile/profile-about/profileabout.component";
import {ProfileconnectionsComponent} from "./profile/profile-connectoins/profileconnctions.component";
import {StaticComponent} from "./static/static.component";
import {MissingconnectionsComponent} from "./connctions/missingconnctions.component"

import {ProfileaddComponent} from "./profile/profile-add/profileadd.component"

export class RouteComponent implements OnInit {
  public hasChanges: boolean = true;

  constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef) {}


  canDeactivate() {
    console.log("Detecting changes. Has Changes: " + this.hasChanges);
    return Observable.of(!this.hasChanges);
  }

  ngOnInit() {
  }
}


const appRoutes: Routes = [

  {path: 'home', component: HomeComponent,  canActivate: [AuthGuard],canDeactivate: [ NavigationService ] },
  {path: 'login', component: LoginComponent, canDeactivate: [ NavigationService ] },
  {path: 'register', component: RegisterComponent,  canDeactivate: [ NavigationService ] },
  {path: 'profile/about', component: ProfileaboutComponent, canActivate: [AuthGuard],canDeactivate: [ NavigationService ] }, //프로필 상세보기
  {path: 'profile/add', component: ProfileaddComponent, canDeactivate: [ NavigationService ] },
  {path: 'profile/connections', component: ProfileconnectionsComponent, canActivate: [AuthGuard],canDeactivate: [ NavigationService ] }, //프로필 상세보기
  {path: 'connections/missing', component: MissingconnectionsComponent, canActivate: [AuthGuard],canDeactivate: [ NavigationService ] },
  {path: 'static', component: StaticComponent, canDeactivate: [ NavigationService ] },


  // otherwise redirect to home
  {path: '**', redirectTo: 'login'}
];



export const routing = RouterModule.forRoot(appRoutes);
