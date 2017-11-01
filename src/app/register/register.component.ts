import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService, UserService} from '../services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})

export class RegisterComponent {
  model: any = {};
  loading = false;

  admin = false;

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService) {
  }

  register() {
    this.loading = true;
    this.userService.createUser(this.model)
      .subscribe(
        data => {
          alert('사용자를 등록하였습니다');
          this.router.navigate(['/home']);
        },
        error => {
          alert('사용자 등록실패' + error);
          this.alertService.error(error, 'admin');
          this.loading = false;
        });
  }
}
