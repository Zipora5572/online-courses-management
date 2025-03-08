import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { AsyncPipe } from '@angular/common';
import { selectCurrentUser } from '../../../store/selectors/user.selector';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatMenuModule, MatToolbarModule, MatIconModule,AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  constructor(private authService: AuthService,private store: Store) {}
  user$: Observable<User|null>



  isLoggedIn: boolean = false
  ngOnInit(): void {
    this.authService.getLoggedInStatus().subscribe(status => {
      this.isLoggedIn = status; 
    });
    if (typeof window !== 'undefined') {
      this.user$ = this.store.select(selectCurrentUser)
      
    
      
  }}

  logout() {
    this.authService.logout();
  }
}
