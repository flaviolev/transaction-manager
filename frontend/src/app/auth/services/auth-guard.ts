import {Injectable} from '@angular/core';
import {CanLoad, Router, Route} from '@angular/router';

import {Observable} from 'rxjs';

import {NavigationService} from '@app/core';

import {AuthService} from './auth.service';


@Injectable({providedIn: 'root'})
export class AuthGuard /* implements CanLoad, CanActivate */ {
  constructor(private authSvc: AuthService, private navigationSvc: NavigationService) {
  }

  // TODO: Add canLoad(...) / canActivate(...)
}
