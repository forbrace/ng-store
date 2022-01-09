import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = {} as User;

  constructor() {}

  getUser(): User {
    return this.user;
  }

  setUser(user: User): User {
    // TODO: create DB user
    this.user = user;
    return this.user;
  }
}
