import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../../services/user.service';
import {  of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const manageCoursesGuard: CanActivateFn = (route, state)=> {
  const userService = inject(UserService)
  let userId=null
  if (typeof window !== 'undefined') {
     userId = Number(sessionStorage.getItem('userId'));
  }
  if (!userId) {
console.log('forbidden');

    return false
  }
  
  return userService.getUserById(userId).pipe(
   
    map(user =>{
     if(user.role != 'teacher')
      console.log('forbidden');

      return user.role === 'teacher'}),
    catchError(err => {
        console.log('Error fetching user data'+userId);
        return of(false); 
    })
);

};
