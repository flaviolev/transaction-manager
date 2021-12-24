import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../core/auth/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  isSuccessful = false
  isSignUpFailed = false
  errorMessage = ''

  constructor(private authService: AuthService, private router: Router) {
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
          this.isSignUpFailed = false
          this.router.navigate(['/login'])
        },
        (err) => {
          this.errorMessage = err.error.message
          this.isSignUpFailed = true
        },
      )
  }
}
