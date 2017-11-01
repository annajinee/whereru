import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {CanDeactivate} from "@angular/router";


export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class NavigationService implements CanDeactivate<CanComponentDeactivate>{
  constructor() {}

  canDeactivate(component: CanComponentDeactivate) {
    if (!component.canDeactivate) {
      return new Promise<boolean>(resolve => { return resolve(true); });
    }

    var retValue = component.canDeactivate();

  }

}

