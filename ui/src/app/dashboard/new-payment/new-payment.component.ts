import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { UserService } from 'src/app/core/user/user.service'
import { catchError, from, map, Observable } from 'rxjs'
import { Transaction } from 'src/app/core/transaction/transaction'

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css'],
})
export class NewPaymentComponent implements OnInit {
  newPaymentForm!: FormGroup

  constructor(private userService: UserService) {}

  @Input() balance = 0
  @Input() user: any
  @Output() saveTransaction = new EventEmitter<Transaction>()

  ngOnInit(): void {
    this.newPaymentForm = new FormGroup({
      from: new FormControl(
        {
          value: '',
          disabled: true,
        },
        [Validators.required],
      ),
      to: new FormControl('', {
        validators: [Validators.required, this.selfTransactionValidator()],
        asyncValidators: [this.userExistsValidator()],
      }),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    })
  }

  userExistsValidator(): AsyncValidatorFn {
    return (to: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userService.existsUser(to?.value).pipe(
        map((exists) => (exists ? null : { userExist: true })),
        catchError(async (err) => null),
      )
    }
  }

  selfTransactionValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value?.toLowerCase() !== this.user?.toLowerCase()
        ? null
        : { selfTransaction: true }
  }

  onSave() {
    let transaction: Transaction = {
      source: this.user,
      target: this.newPaymentForm.get('to')?.value,
      amount: this.newPaymentForm.get('amount')?.value,
    }

    this.saveTransaction.emit(transaction)
  }
}
