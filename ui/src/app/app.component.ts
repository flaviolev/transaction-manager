import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { TokenStorageService } from './core/auth/token-storage.service'
import { UserStoreService } from './core/user/userStore.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Finance Manager'
  isLoggedIn = false
  username?: string
  private roles: string[] = []
  eventBusSub?: Subscription

  constructor(
    private tokenStorageService: TokenStorageService,
    private userStore: UserStoreService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.userStore.getIsLoggedIn().subscribe((userStatus) => {
      console.log('user is logged in ', userStatus)
      this.isLoggedIn = userStatus
      if (this.isLoggedIn) this.route.navigate(['/dashboard'])

      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser()
        this.roles = user.roles

        this.username = user.username
      }
    })
  }

  logout(): void {
    this.tokenStorageService.signOut()
    this.userStore.setIsLoggedIn(false)
  }
}
