import { Component, Input, OnInit } from '@angular/core'
import { Transaction } from '../core/transaction/transaction'
import { TransactionService } from '../core/transaction/transaction.service'
import { map } from 'rxjs'
import { Router } from '@angular/router'
import { NewTransactionSharingService } from '../core/transaction/newTransactionSharing.service'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = []
  isNewTx: boolean = false
  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private newTransactionSharingService: NewTransactionSharingService,
  ) {}

  @Input() fetchSize: number = 0
  @Input() showButton: boolean = false
  @Input() showFilter: boolean = true

  ngOnInit(): void {
    this.getTransactions()
  }

  getTransactions() {
    this.newTransactionSharingService
      .getIsNewTransaction()
      .subscribe((isNewTx) => {
        isNewTx ? this.getTransactionsFromTransactionService() : null
        console.log('is new tx', isNewTx)
      })
    this.getTransactionsFromTransactionService()
  }

  private getTransactionsFromTransactionService() {
    this.transactionService.getTransactionsByUsername().subscribe((res) => {
      this.transactions = this.fetchSize
        ? sortByDate(res).slice(0, this.fetchSize)
        : sortByDate(res)

      function sortByDate(transaction: Transaction[]): Transaction[] {
        return transaction.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
      }
    })
  }

  goToTransationsPage() {
    this.router.navigate(['/transactions'])
  }
}
