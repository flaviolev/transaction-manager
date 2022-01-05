import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from '../core/auth/token-storage.service'
import { TransactionService } from '../core/transaction/transaction.service'
import { UserService } from '../core/user/user.service'
import { Transaction } from '../core/transaction/transaction'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentBalance = 0
  currentUser: any
  transaction: Transaction | undefined
  transactions: Transaction[] = []
  constructor(
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private transactionService: TransactionService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.userService.getBalance().subscribe((bal) => {
      this.currentBalance = bal
    })
    this.loadTransactions()
    const user = this.tokenStorageService.getUser()
    this.currentUser = user.username
  }
  private loadTransactions() {
    this.transactionService
      .getTransactionsByUsername(3)
      .subscribe((res) => (this.transactions = res))
  }
  onSaveTransaction(newTransaction: any) {
    this.transactionService
      .createTransaction(newTransaction)
      .subscribe((res) => {
        this._snackBar.open('transaction executed successfully', 'Close', {
          duration: 1500,
          panelClass: ['snackbar-success'],
        })
        this.loadTransactions()
      })
  }
}
