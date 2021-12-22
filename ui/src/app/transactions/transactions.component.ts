import { Component, Input, OnInit } from '@angular/core';

export interface Transaction {
  source: string;
  target: string;
  amount: number;
  balance: number;
  creationDate: Date;
}

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
  
  constructor() { }

  ngOnInit(): void {
  }

}