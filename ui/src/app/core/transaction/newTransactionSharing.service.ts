import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NewTransactionSharingService {
  constructor() {}

  private isnewTransaction$ = new Subject<boolean>()

  setIsNewTransaction(inNew: boolean) {
    this.isnewTransaction$.next(inNew)
  }

  getIsNewTransaction(): Observable<boolean> {
    return this.isnewTransaction$.asObservable()
  }
}
