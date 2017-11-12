import {Component} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {User} from "./models/user";
import {ProfileService} from "./services/profile.service";


@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
})

export class AppComponent {

  isSignedIn: boolean;
  currentUser: User;
  user:User[];
  username: string;
  ngOnInit(): void {
    this.getUser();
  }
  constructor(private router: Router, private profileService: ProfileService, private loginService: AuthenticationService, route: ActivatedRoute) {
    router.events.subscribe(() => {
      this.isSignedIn = loginService.isSignedIn();
      this.username = localStorage.getItem('email');
    });
  }

  login(event, email) {
    event.preventDefault();
    this.loginService.login(email)
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  handleError(error) {
    console.log(error.status);
  }
  getUser() {
    this.profileService.getUserdetail()
        .subscribe(
            result => {
              this.user = result['user'];
            },
            error => {
            });

  }
}
