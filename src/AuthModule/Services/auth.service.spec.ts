import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when valid username and password are provided', () => {
    const username = 'admin';
    const password = 'admin';
    const result = service.login(username, password);
    expect(result).toBe(true);
  });

  it('should return false when invalid username is provided', () => {
    const username = 'invalid';
    const password = 'admin';
    const result = service.login(username, password);
    expect(result).toBe(false);
  });

  it('should return false when invalid password is provided', () => {
    const username = 'admin';
    const password = 'invalid';
    const result = service.login(username, password);
    expect(result).toBe(false);
  });

  it('should not set username in local storage when login fails', () => {
    service.logout();
    const username = 'invalid';
    const password = 'invalid';
    service.login(username, password);
    const storedUsername = localStorage.getItem('username');
    expect(storedUsername).toBeNull();
  });
});
