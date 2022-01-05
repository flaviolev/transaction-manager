import { Component, Input, OnInit } from '@angular/core'
import { Transaction } from '../core/transaction/transaction'
import { TransactionService } from '../core/transaction/transaction.service'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = []
  isNewTx: boolean = false
  isNewTxSubscription = new Subscription()
  constructor(
    private transactionService: TransactionService,
    private router: Router,
  ) {}

  @Input() fetchSize: number = 0
  @Input() showButton: boolean = false
  @Input() showFilter: boolean = true

  ngOnInit(): void {
    this.getTransactions()
  }

  getTransactions() {
    this.getTransactionsFromTransactionService()
  }

  private getTransactionsFromTransactionService() {
    this.transactionService
      .getTransactionsByUsername(this.fetchSize)
      .subscribe((res) => {
        this.transactions = res
      })
  }

  goToTransationsPage() {
    this.router.navigate(['/transactions'])
  }
}
