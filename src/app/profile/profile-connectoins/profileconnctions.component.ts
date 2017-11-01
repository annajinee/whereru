import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";



@Component({
  selector: 'app-profile',
  templateUrl: 'profileconnections.component.html',
})
export class ProfileconnectionsComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor( private router: Router, private alertService: AlertService) {

  }

}
