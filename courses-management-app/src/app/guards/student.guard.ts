import { CanActivateFn } from '@angular/router';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const studentGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const userId = Number(sessionStorage.getItem('userId'))
  if (!userId) {
    alert('Forbidden')
    return false
  }
  return userService.getUserById(userId).pipe(
    map(user => user.role === 'student'),
    catchError(err => {
        alert('Error fetching user data')
        return of(false); 
    })
);

};
