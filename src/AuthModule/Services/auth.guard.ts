import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const username = localStorage.getItem('username');
  if (username) {
    return true;
  }else{
    //inject the router and navigate to the login page
    return router.navigate(['/auth/login']);
  }
};
