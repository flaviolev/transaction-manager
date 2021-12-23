import { Component, Input, OnInit } from '@angular/core'
import { Transaction } from '../core/transaction/transaction'
import { TransactionService } from '../core/transaction/transaction.service'
import { TokenStorageService } from '../core/auth/token-storage.service'
import { first, map, pipe, take, tap } from 'rxjs'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = []
  displayedColumns: string[] = [
    'source',
    'target',
    'amount',
    'balance',
    'creationDate',
  ]

  constructor(
    private transactionService: TransactionService,
    private tokenStorageService: TokenStorageService,
  ) {}

  @Input() fetchSize: number = 0

  ngOnInit(): void {
    let currentUsername = this.tokenStorageService.getUser()?.username
    console.log('CUR USER', currentUsername)

    this.transactionService
      .getTransactionsByUsername(currentUsername)
      .pipe(
        map((x) => (this.fetchSize ? x.slice(0, this.fetchSize) : x)),

        tap((res: any) => console.log('tap', res)),
      )
      .subscribe((res) => {
        this.transactions = res
      })
  }
}
