import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { log } from 'console';

export const manageCoursesGuard: CanActivateFn = (route, state)=> {
  const userService = inject(UserService)
  const userId = Number(sessionStorage.getItem('userId'))


  if (!userId) {
    alert('Forbidden')
    return false
  }
  
  return userService.getUserById(userId).pipe(
   
    map(user => user.role === 'teacher'),
    catchError(err => {
        alert('Error fetching user data'+userId);
        return of(false); 
    })
);

};
