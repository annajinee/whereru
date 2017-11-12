import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {ProfileService} from "../../services/profile.service";
import {User} from "../../models/user";


@Component({
  selector: 'app-profile',
  templateUrl: 'profileabout.component.html',
})
export class ProfileaboutComponent implements OnInit {
  ngOnInit(): void {
    this.getUser();
  }
user:User[];

  constructor( private router: Router, private profileService: ProfileService, private alertService: AlertService) {
      router.events.subscribe(() => {
          localStorage.getItem('email');
          // this.email='demo1@demo.com';
      });
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
