import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { UserStoreService } from '../user/userStore.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private userStore: UserStoreService) {}
  isLoggedInVar: boolean = false

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isLoggedIn()
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isLoggedIn()
  }

  private isLoggedIn(): boolean {
    this.userStore
      .getIsLoggedIn()
      .subscribe((userStatus) => (this.isLoggedInVar = userStatus))
    return this.isLoggedInVar
  }
}
