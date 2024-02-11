import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route:Router) { }

  login(username: string, password: string):boolean {
    if (username === 'martin' && password === 'pesalink') {
      localStorage.setItem('username', username);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('username');
    this.route.navigate(['/auth/login']);
  }

  getuser():string|null{
    return localStorage.getItem('username');
  }
}
