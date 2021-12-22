import { Component, Input, OnInit } from '@angular/core'
import { Transaction } from '../core/transaction/transaction'
import { TransactionService } from '../core/transaction/transaction.service'

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

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((res) => {
      console.log(res)
      this.transactions = res
    })
  }
}
