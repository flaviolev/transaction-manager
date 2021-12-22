import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from '../../core/auth/token-storage.service'
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { UserService } from 'src/app/core/user/user.service'
import { catchError, from, map, Observable } from 'rxjs'
import { TransactionService } from 'src/app/core/transaction/transaction.service'
import { Transaction } from 'src/app/core/transaction/transaction'

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
    private userService: UserService, private transactionService: TransactionService,
  ) {}

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser()
    this.currentUser = user.username
    this.newPaymentForm = new FormGroup({
      from: new FormControl({ value: this.currentUser!, disabled: true }, [
        Validators.required,
      ]),
      to: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [this.userExistsValidator()],
      }),
      amount: new FormControl(null, [Validators.required]),
    })
  }

  userExistsValidator(): AsyncValidatorFn {
    return (to: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.existsUser(to?.value).pipe(
        map((exists) => (exists ? null : { userExist: false })),
        catchError(async (err) => null),
      )
    }
  }

  onSave() {
    let transaction: Transaction={
      source: this.newPaymentForm.get('from')?.value,
      target: this.newPaymentForm.get('to')?.value,
      amount: this.newPaymentForm.get('amount')?.value,
    } ;
    console.log("transaction",transaction)
    
    this.transactionService.createTransaction(transaction).subscribe(res=>console.log(res))
  }
}
