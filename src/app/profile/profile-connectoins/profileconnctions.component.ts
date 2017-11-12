import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {ProfileService} from "../../services/profile.service";
import {User} from "../../models/user";


@Component({
  selector: 'app-profile',
  templateUrl: 'profileconnections.component.html',
})
export class ProfileconnectionsComponent implements OnInit {
  ngOnInit(): void {
      this.getUser();
      this.getUserDetail();
  }
    user:User[];
  userDetail:User[];
  familyName : string;
  constructor( private router: Router, private profileService: ProfileService, private alertService: AlertService) {
      router.events.subscribe(() => {
          localStorage.getItem('email');
          // this.email='demo1@demo.com';
      });
  }

  getUser() {
    this.profileService.getUsers()
        .subscribe(
            result => {
              this.user = result['users'];
            },
            error => {
            });

  }


    getUserDetail() {
        this.profileService.getUserdetail()
            .subscribe(
                result => {
                    this.userDetail = result['user'];
                },
                error => {
                });

    }
}
