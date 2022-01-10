/*import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
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
        this._snackBar.open(errorMessage, 'Close', {
          duration: 2000,
          panelClass: ['snackbar-fail'],
        })
        return throwError(errorMessage)
      }),
    )
  }
}
export const httpErrorInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
    deps: [MatSnackBar],
  },
]*/
