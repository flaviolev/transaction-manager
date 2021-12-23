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
