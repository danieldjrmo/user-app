import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './app';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServices {

  private readonly apiUrl = environment.api
  private httpVariable = inject(HttpClient)
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  getAllUsers(): Observable<User[]> {
    return this.httpVariable.get<User[]>(`${this.apiUrl}`, {
      headers: this.jsonHeaders
    }).pipe(
      map((raw) => raw.reverse())
    );
  }


  addUser(user: User): Observable<User> {
    return this.httpVariable.post<User>(`${this.apiUrl}/add`, user, {
      headers: this.jsonHeaders
    })
  }

  constructor() { }
}
