import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";
import {Observable, Subject} from "rxjs";


@Component({
  selector: 'app-news',
  templateUrl: 'news.component.html',
})
export class NewsComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

}
