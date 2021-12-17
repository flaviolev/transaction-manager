import { Injectable } from '@angular/core'
import { BehaviorSubject, filter, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  constructor() {}

  private user$ = new BehaviorSubject<any>(null)

  setUser(user: any) {
    this.user$.next(user)
  }

  getUser(): Observable<any> {
    return this.user$.asObservable().pipe(filter((user: any) => !!user))
  }
}
