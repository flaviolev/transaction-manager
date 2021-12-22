import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../core/transaction/transaction';
import { TransactionService } from '../core/transaction/transaction.service';

const TEST_DATA: Transaction[] = [
  {source: "user1", target: 'user2', amount: 1079, balance: 179, creationDate: new Date()},
  {source: "user2", target: 'user1', amount: 426, balance: 179, creationDate: new Date()},
];

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = TEST_DATA;  
  displayedColumns: string[] = ['source', 'target', 'amount', 'balance', 'creationDate'];
  
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((res)=>this.transactions=res)
  }
}