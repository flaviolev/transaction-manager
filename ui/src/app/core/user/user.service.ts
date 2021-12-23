import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const API_URL = 'http://localhost:8080/api/user/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  existsUser(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${API_URL}${username}`, httpOptions)
  }

  getBalance(): Observable<number> {
    return this.http.get<number>(`${API_URL}balance`, httpOptions)
  }
}
