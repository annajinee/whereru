import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {
    }


    login(email): boolean {
        localStorage.clear();
        localStorage.setItem('email', email);
        if(localStorage.getItem('email') !==null){
            return true;
        }else {
            return false;
        }

    }


    logout() {
        localStorage.removeItem('email');
        localStorage.clear();
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


    isSignedIn(): boolean {
        console.log('email'+localStorage.getItem('email'));

        return localStorage.getItem('email') !== null;
    }


}
