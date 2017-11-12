import {Component, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";
import {ProfileService} from "../services/profile.service";
import {Status} from "../models/status";
import {Users} from "../models/users";
import {marker} from "../models/maker";

@Component({
  selector: 'app-connection',
    styles: [`
   .sebm-google-map-container {
       height: 300px;
     }
  `],
  templateUrl: 'missingconnections.component.html',

})
export class MissingconnectionsComponent implements OnInit {
  ngOnInit(): void {
      this.getStaus();
  }
    // google maps zoom level
    zoom: number = 14;

    // initial center position for the map
    // lat: number = 51.673858;
    // lng: number = 7.815982;
    lat: number;
    lng: number;
    markers: marker[] = [
        {
            lat:this.lat,
            lng: this.lng,
            label: 'A',
            draggable: true
        }
    ]

    status:Status[];
    users:Users[];
  constructor( private router: Router, private profileService: ProfileService) {

  }
  getStaus() {
    this.profileService.getStatus(1)
        .subscribe(
            result => {
              this.users = result['users'];
            },
            error => {
            });
  }
    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    mapClicked($event: MouseEvent) {
        // this.markers.push({
        //     lat: $event.coords.lat,
        //     lng: $event.coords.lng
        // });
    }
}
