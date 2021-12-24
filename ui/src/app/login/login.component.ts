import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AuthService } from '../core/auth/auth.service'
import { TokenStorageService } from '../core/auth/token-storage.service'
import { UserStoreService } from '../core/user/userStore.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoggedIn = false
  isLoginFailed = false
  errorMessage = ''
  subscription: Subscription | undefined
  loginForm!: FormGroup
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userStore: UserStoreService,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    })
  }

  ngOnInit(): void {
    this.subscription = this.userStore
      .getIsLoggedIn()
      .subscribe((userStatus) => {
        console.log('user is logged in ', userStatus)
        this.isLoggedIn = userStatus
      })
  }

  onSubmit(): void {
    const username = this.loginForm.get('username')
    const password = this.loginForm.get('password')
    this.authService.login(username?.value, password?.value).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data)

        this.isLoginFailed = false
        this.userStore.setIsLoggedIn(true)
      },
      (err) => {
        this.errorMessage = err.error.message
        this.isLoginFailed = true
      },
    )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
