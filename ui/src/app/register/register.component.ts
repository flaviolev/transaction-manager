import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { AuthService } from '../core/auth/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  isSuccessful = false
  isSignUpFailed = false
  errorMessage = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    })
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const username = this.registerForm.get('username')
    const email = this.registerForm.get('email')
    const password = this.registerForm.get('password')

    this.authService
      .register(username?.value, email?.value, password?.value)
      .subscribe(
        (data) => {
          console.log(data)
          this.isSuccessful = true
          this._snackBar.open('user registered successfully', 'Close', {
            duration: 1500,
            panelClass: ['snackbar-success'],
          })
          this.isSignUpFailed = false
          this.router.navigate(['/login'])
        },
        (err) => {
          this.errorMessage = err.error.message
          this._snackBar.open(err.error.message, 'Close', {
            duration: 1500,
            panelClass: ['snackbar-fail'],
          })
          this.isSignUpFailed = true
        },
      )
  }
}
