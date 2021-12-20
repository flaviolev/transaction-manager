import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from '../../core/auth/token-storage.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from 'src/app/core/user.service'

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css'],
})
export class NewPaymentComponent implements OnInit {
  currentUser: string | undefined
  newPaymentForm!: FormGroup

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser()
    this.currentUser = user.username
    this.newPaymentForm = new FormGroup({
      from: new FormControl({ value: this.currentUser!, disabled: true }, [
        Validators.required,
      ]),
      to: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
    })
  }

  onHandlePayment() {
    const to = this.newPaymentForm.get('to')
    this.userService
      .existsUser(to?.value)
      .subscribe((result) => console.log('user exist', result))
  }
}
