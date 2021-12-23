import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Transaction } from './transaction'

const TX_API = 'http://localhost:8080/api/transaction/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  createTransaction(transaction: Transaction): Observable<any> {
    return this.http.post(TX_API, transaction, httpOptions)
  }

  getTransactionsByUsername(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(TX_API, httpOptions)
  }
}
