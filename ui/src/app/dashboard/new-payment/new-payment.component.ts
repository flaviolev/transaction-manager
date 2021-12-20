import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from '../../core/auth/token-storage.service'

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css'],
})
export class NewPaymentComponent implements OnInit {
  currentUser: string | undefined
  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser()
    this.currentUser = user.username
  }

  onHandlePayment() {}
}
