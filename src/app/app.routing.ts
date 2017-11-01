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
import {NewsComponent} from "./news/news.component";




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

  {path: 'home', component: HomeComponent,  canDeactivate: [ NavigationService ] },
  {path: 'login', component: LoginComponent, canDeactivate: [ NavigationService ] },
  {path: 'register', component: RegisterComponent,  canDeactivate: [ NavigationService ] },
  {path: 'news', component: NewsComponent,  canDeactivate: [ NavigationService ] },
  {path: 'profile/about', component: ProfileaboutComponent, canDeactivate: [ NavigationService ] }, //프로필 상세보기
  {path: 'profile/connections', component: ProfileconnectionsComponent, canDeactivate: [ NavigationService ] }, //프로필 상세보기


  // otherwise redirect to home
  {path: '**', redirectTo: 'home'}
];



export const routing = RouterModule.forRoot(appRoutes);
