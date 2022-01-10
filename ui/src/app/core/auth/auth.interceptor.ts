import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'

import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, filter, switchMap, take } from 'rxjs/operators'
import { TokenStorageService } from './token-storage.service'
import { AuthService } from './auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { UserStoreService } from '../user/userStore.service'
const TOKEN_HEADER_KEY = 'Authorization' // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  )

  constructor(
    private tokenService: TokenStorageService,
    private userStore: UserStoreService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<Object>> {
    let authReq = req
    const token = this.tokenService.getToken()
    if (token != null) {
      authReq = this.addTokenHeader(req, token)
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        let errorMessage = ''
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`
        } else {
          // server-side error
          errorMessage = error.error
            ? error.error
            : `Error Code: ${error.status}\nMessage: ${error.message}`
        }
        if (error.status !== 401) {
          this._snackBar.open(errorMessage, 'Close', {
            duration: 2000,
            panelClass: ['snackbar-fail'],
          })
        }

        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('auth/signin') &&
          error.status === 401
        ) {
          return this.handle401Error(authReq, next)
        }
        if (error.status === 403) {
          this._snackBar.open('Session Expired. Please login again', 'Close', {
            duration: 5000,
            panelClass: ['snackbar-fail'],
          })
          this.signOut()
        }

        return throwError(error)
      }),
    )
  }

  private signOut() {
    this.tokenService.signOut()
    this.userStore.setIsLoggedIn(false)
    this.router.navigate(['/login'])
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true
      this.refreshTokenSubject.next(null)

      const refreshToken = this.tokenService.getRefreshToken()

      if (refreshToken)
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false

            this.tokenService.saveToken(token.accessToken)
            this.refreshTokenSubject.next(token.accessToken)

            return next.handle(
              this.addAccessTokenHeader(request, token.accessToken),
            )
          }),
          catchError((err) => {
            this.isRefreshing = false

            this.tokenService.signOut()
            return throwError(err)
          }),
        )
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) =>
        next.handle(this.addAccessTokenHeader(request, token.accessToken)),
      ),
    )
  }
  private addAccessTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
    })
  }
  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(
        TOKEN_HEADER_KEY,
        'Bearer ' + JSON.parse(token).token,
      ),
    })
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    // deps: [MatSnackBar],
  },
]
