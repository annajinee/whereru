import {Component} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {User} from "./models/user";

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
})

export class AppComponent {

  isSignedIn: boolean;
  currentUser: User;
  username: string;

  constructor(private router: Router, private loginService: AuthenticationService, route: ActivatedRoute) {
    router.events.subscribe(() => {
      this.isSignedIn = loginService.isSignedIn();
      this.username = localStorage.getItem('name');
    });
  }

  login(event, email, password) {
    event.preventDefault();
    this.loginService.login(email, password)
      .subscribe(() => {
        this.router.navigate(['/add']);
      }, this.handleError);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  handleError(error) {
    console.log(error.status);
  }

}
