import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {ProfileService} from "../services/profile.service";
import {Static} from "../models/static";

@Component({
  selector: 'app-home',
  templateUrl: 'static.component.html',
})
export class StaticComponent implements OnInit {

  constructor(private router: Router, private profileService: ProfileService) {
      router.events.subscribe(() => {
          localStorage.getItem('email');
          // this.email='demo1@demo.com';
      });
  }
statics: Static[];
  dead: string;
  ngOnInit() {
    this.getStatics();
  }
  getStatics() {
    this.profileService.getStatics()
        .subscribe(
            result => {
              this.statics = result['statistics'];
            },
            error => {
            });
  }
}
