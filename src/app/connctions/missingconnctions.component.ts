import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";



@Component({
  selector: 'app-connection',
  templateUrl: 'missingconnections.component.html',
})
export class MissingconnectionsComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor( private router: Router) {

  }

}
