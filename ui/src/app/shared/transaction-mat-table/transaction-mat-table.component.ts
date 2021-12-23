import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Transaction } from '../../core/transaction/transaction'

@Component({
  selector: 'app-transaction-mat-table',
  templateUrl: './transaction-mat-table.component.html',
  styleUrls: ['./transaction-mat-table.component.css'],
})
export class TransactionMatTableComponent implements OnInit {
  displayedColumns: string[] = [
    'source',
    'target',
    'amount',
    'balance',
    'creationDate',
  ]
  @Input() transactions: Transaction[] = []
  @Input() fetchSize: number = 0
  @Input() showButton: boolean = false

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToTransationsPage() {
    this.router.navigate(['/transactions'])
  }
}
