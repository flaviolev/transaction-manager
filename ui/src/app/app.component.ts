import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from './core/auth/token-storage.service'
import { UserStoreService } from './core/user/userStore.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Finance Manager'
  isLoggedIn = false
  username?: string
  private roles: string[] = []

  constructor(
    private tokenStorageService: TokenStorageService,
    private userStore: UserStoreService,
  ) {}

  ngOnInit(): void {
    this.userStore.getUser().subscribe((user) => console.log('user is', user))
    this.isLoggedIn = !!this.tokenStorageService.getToken()

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser()
      this.roles = user.roles

      this.username = user.username
    }
  }

  logout(): void {
    this.tokenStorageService.signOut()
    window.location.reload()
  }
}
