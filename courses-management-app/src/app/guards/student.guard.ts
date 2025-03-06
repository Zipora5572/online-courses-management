import { CanActivateFn } from '@angular/router';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const studentGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  let userId =null;
  if (typeof window !== 'undefined') {
    userId= Number(sessionStorage.getItem('userId'))
  }
  if (!userId) {
    console.log('forbidden');

    return false
  }
  return userService.getUserById(userId).pipe(
    map(user => user.role === 'student'),
    catchError(err => {
      console.log('Error fetching user data')
        return of(false); 
    })
);

};
