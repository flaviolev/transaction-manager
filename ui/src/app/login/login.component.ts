import { Component, OnDestroy, OnInit } from '@angular/core'
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
  form: any = {
    username: null,
    password: null,
  }
  isLoggedIn = false
  isLoginFailed = false
  errorMessage = ''
  subscription: Subscription | undefined
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userStore: UserStoreService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.userStore
      .getIsLoggedIn()
      .subscribe((userStatus) => {
        console.log('user is logged in ', userStatus)
        this.isLoggedIn = userStatus
      })
  }

  onSubmit(): void {
    const { username, password } = this.form

    this.authService.login(username, password).subscribe(
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
