import { Component, Input, OnInit } from '@angular/core'
import { Transaction } from '../core/transaction/transaction'
import { TransactionService } from '../core/transaction/transaction.service'
import { map } from 'rxjs'
import { Router } from '@angular/router'

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
    private router: Router,
  ) {}

  @Input() fetchSize: number = 0
  @Input() showButton: boolean = false

  ngOnInit(): void {
    this.transactionService
      .getTransactionsByUsername()
      .pipe(map((x) => (this.fetchSize ? x.slice(0, this.fetchSize) : x)))
      .subscribe((res) => {
        this.transactions = res
      })
  }

  goToTransationsPage() {
    this.router.navigate(['/transactions'])
  }
}
