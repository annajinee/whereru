import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";
import {Observable, Subject} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

}
