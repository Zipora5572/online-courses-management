import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { getUserById } from '../../../store/actions/user.action';
import { selectUser } from '../../../store/selectors/user.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatMenuModule, MatToolbarModule, MatIconModule,AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  constructor(private authService: AuthService,private store: Store) {}
  user$: Observable<User>



  isLoggedIn: boolean = false
  ngOnInit(): void {
    this.authService.getLoggedInStatus().subscribe(status => {
      this.isLoggedIn = status; 
    });
    if (typeof window !== 'undefined') {
      this.user$ = this.store.select(selectUser(Number(sessionStorage.getItem('userId'))));
    
  }}

  logout() {
    this.authService.logout();
  }
}
