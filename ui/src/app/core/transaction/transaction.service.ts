import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
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

  getTransactionsByUsername(fetchSize: number): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(TX_API, httpOptions)
      .pipe(
        map((transactions: Transaction[]) =>
          fetchSize
            ? sortByDate(transactions).slice(0, fetchSize)
            : sortByDate(transactions),
        ),
      )
  }
}
function sortByDate(transaction: Transaction[]): Transaction[] {
  return transaction.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}
