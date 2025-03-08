import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../../services/auth.service';
import { User, UserRole } from '../../../models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginUser } from '../../../store/actions/user.action';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, MatOptionModule, FormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  authForm: FormGroup;
  isLoginMode: boolean = true;
  roles: UserRole[] = ['teacher', 'student'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.authForm = this.fb.group({
      name: ['', this.isLoginMode ? null : Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', this.isLoginMode ? null : Validators.required],
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;

    // Update validators based on the mode
    if (this.isLoginMode) {
      this.authForm.get('name')?.clearValidators();
      this.authForm.get('role')?.clearValidators();
    } else {
      this.authForm.get('name')?.setValidators(Validators.required);
      this.authForm.get('role')?.setValidators(Validators.required);
    }

    // Update the form controls to reflect changes
    this.authForm.get('name')?.updateValueAndValidity();
    this.authForm.get('role')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    const { name, email, password, role } = this.authForm.value;

    if (this.isLoginMode) {
      this.login(email, password);
    } else {
      this.signUp(name, email, password, role);
    }
  }

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe(response => {
      this.store.dispatch(loginUser({ email, password }));
      this.router.navigate(['/home']);
    });
  }

  signUp(name: string, email: string, password: string, role: string) {
    this.authService.register(name, email, password, role).subscribe({
      next: response => {
        this.router.navigate(['/home']);
      },
      error: error => {
        // console.error('Registration failed:', error);
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
