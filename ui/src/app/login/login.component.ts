import { Component, OnInit } from '@angular/core'
import { AuthService } from '../core/auth/auth.service'
import { TokenStorageService } from '../core/auth/token-storage.service'
import { Router, RouterModule } from '@angular/router'
import { UserStoreService } from '../core/user/userStore.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  }
  isLoggedIn = false
  isLoginFailed = false
  errorMessage = ''
  roles: string[] = []

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private route: Router,
    private userStore: UserStoreService,
  ) {}

  ngOnInit(): void {
    this.userStore.getIsLoggedIn().subscribe((userStatus) => {
      console.log('user is logged in ', userStatus)
      this.isLoggedIn = userStatus
      if (this.isLoggedIn) this.roles = this.tokenStorage.getUser().roles
    })
  }

  onSubmit(): void {
    const { username, password } = this.form

    this.authService.login(username, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken)
        this.tokenStorage.saveUser(data)

        this.isLoginFailed = false
        this.roles = this.tokenStorage.getUser().roles
        this.userStore.setIsLoggedIn(true)
      },
      (err) => {
        this.errorMessage = err.error.message
        this.isLoginFailed = true
      },
    )
  }
}
