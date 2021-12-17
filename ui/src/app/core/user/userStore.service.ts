import { Injectable } from '@angular/core'
import { BehaviorSubject, filter, Observable } from 'rxjs'
import { TokenStorageService } from '../auth/token-storage.service'

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  constructor(private tokenStorageService: TokenStorageService) {}

  private isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken())

  setIsLoggedIn(login: boolean) {
    this.isLoggedIn$.next(login)
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable()
  }
  private hasToken(): boolean {
    return !!this.tokenStorageService.getToken()
  }
}
