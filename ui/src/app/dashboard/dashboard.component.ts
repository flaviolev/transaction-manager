import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from '../core/auth/token-storage.service'
import { TransactionService } from '../core/transaction/transaction.service'
import { UserService } from '../core/user/user.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentBalance = 0
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getBalance().subscribe((bal) => {
      this.currentBalance = bal
    })
  }
}
