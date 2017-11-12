import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {ProfileService} from "../services/profile.service";
import {Static} from "../models/static";
import {marker} from "../models/maker";
import { Compiler } from '@angular/core';
@Component({
  selector: 'app-home',
    styles: [`
   .sebm-google-map-container {
       height: 300px;
     }
  `],
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {

    loading : boolean;

    // google maps zoom level
    zoom: number = 14;

    // initial center position for the map
    lat: number = 37.514868;
    lng: number = 127.102482;
  constructor(private router: Router, private profileService: ProfileService, private _compiler: Compiler) {
      router.events.subscribe(() => {
          localStorage.getItem('email');
          // this.email='demo1@demo.com';
      });
      this._compiler.clearCache();
      // this.getStatics();
  }

    markers: marker[] = [
        {
            lat: 37.514868,
            lng: 127.102482,
            label: 'Danger',
            draggable: true
        },
        {
            lat: 37.513503,
            lng: 127.103620,
            label: 'Danger',
            draggable: false
        },
        {
            lat: 37.514456,
            lng: 127.105934,
            label: 'Warning',
            draggable: true
        }
    ]
statics: Static[];

  ngOnInit() {
    this.getStatics();

  }
   getStatics() {
    this.profileService.getStatics()
        .subscribe(
            result => {
              this.statics = result['statistics'];
              this.loading = false;
            },
            error => {
            });
      this.loading = false;
  }
    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }


    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }
}
