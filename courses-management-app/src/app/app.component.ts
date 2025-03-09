import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { Store } from '@ngrx/store';
import { UserService } from '../services/user.service';
import { loginUserSuccess } from '../store/actions/user.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private store: Store, private userService: UserService) {}

  ngOnInit() {
    let userId = null;
    if (typeof window !== 'undefined') {
       userId = sessionStorage.getItem('userId');
    }
    if (userId) {   
      this.userService.getUserById(+userId).subscribe(user => {
        this.store.dispatch(loginUserSuccess({ user })); 
      });
    }
  }
}