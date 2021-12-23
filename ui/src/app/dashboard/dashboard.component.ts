import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from '../core/auth/token-storage.service'
import { TransactionService } from '../core/transaction/transaction.service'
import { UserService } from '../core/user/user.service'
import { Transaction } from '../core/transaction/transaction'

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
      .subscribe((res) => window.location.reload())
  }
}
