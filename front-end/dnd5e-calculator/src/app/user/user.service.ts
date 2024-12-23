import { Injectable, OnInit } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | null >(null);
  public user$ = this.user$$.asObservable();

  user: UserForAuth | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.getProfile().subscribe();
    this.user$.subscribe((user) => {
      this.user = user;
    });
   }

   login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('/api/users/login', {email, password})
      .pipe(tap((user) => this.user$$.next(user)));
   }

   register(username: string, email: string, password: string, rePassword: string) {
    return this.http
      .post<UserForAuth>('/api/users/register', {username, email, password, rePassword})
      .pipe(tap((user) => this.user$$.next(user)));
   }

   logout() {
    return this.http.post('/api/users/logout', {})
      .pipe(tap(() => this.user$$.next(null)));
   }

   getProfile() {
    return this.http.get<UserForAuth>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));;
   }

   updateProfile(username: string, email: string) {
    return this.http.put<UserForAuth>(`/api/users/profile`, {username, email})
      .pipe(tap((user) => this.user$$.next(user)));
   }
}
