import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from '../core/auth/token-storage.service'
import { TransactionService } from '../core/transaction/transaction.service'
import { UserService } from '../core/user/user.service'
import { Transaction } from '../core/transaction/transaction'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentBalance = 0
  currentUser: any
  transaction: Transaction | undefined
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
    const user = this.tokenStorageService.getUser()
    this.currentUser = user.username
  }

  onSaveTransaction(newTransaction: any) {
    this.transactionService
      .createTransaction(newTransaction)
      .subscribe((res) => {
        this._snackBar.open('transaction executed successfully', 'Close', {
          duration: 1500,
          panelClass: ['snackbar-success'],
        })
        window.location.reload()
      })
  }
}
