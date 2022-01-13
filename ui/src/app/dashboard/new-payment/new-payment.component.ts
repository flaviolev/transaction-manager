import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
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
  styleUrls: ['./new-payment.component.scss'],
})
export class NewPaymentComponent implements OnInit, OnChanges {
  newPaymentForm!: FormGroup

  constructor(private userService: UserService) {
    this.newPaymentForm = new FormGroup({
      from: new FormControl(
        {
          value: this.user + '[CHF] ' + this.balance,
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

  @Input() balance = 0
  @Input() user: any
  @Output() saveTransaction = new EventEmitter<Transaction>()
  ngOnChanges(changes: any): void {
    if (changes.balance.currentValue) {
      this.newPaymentForm.patchValue({
        from: this.user + '[CHF] ' + this.balance,
      })
    }
  }
  ngOnInit(): void {}

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
    this.resetToandAmountFields()
  }

  private resetToandAmountFields() {
    this.newPaymentForm.get('to')?.reset()
    this.newPaymentForm.get('amount')?.reset()
  }
}
