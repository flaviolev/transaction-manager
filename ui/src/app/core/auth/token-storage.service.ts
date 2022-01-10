import { Injectable } from '@angular/core'

const TOKEN_KEY = 'auth-token'
const REFRESHTOKEN_KEY = 'auth-refreshtoken'
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear()
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token))
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY)
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token)
  }
  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY)
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY)
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(TOKEN_KEY)
    if (user) {
      return JSON.parse(user)
    }

    return {}
  }
}
