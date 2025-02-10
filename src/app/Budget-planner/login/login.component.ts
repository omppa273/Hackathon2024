import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule], // Added HttpClientModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: any;
  registerForm: any;
  activeForm: 'login' | 'register' = 'login';

  // Define API URL directly
  private API_URL = 'http://localhost:3000'; // Change this to match your backend URL

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  // Login method calling backend API
  login() {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.value.email, // Mapping email field to username
        password: this.loginForm.value.password,
      };

      this.http.post(`${this.API_URL}/login`, loginData).subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          this.router.navigate(['/budget-planner/dashboard']);
        },
        (error) => {
          console.error('Login failed:', error);
          this.snackBar.open('Invalid email or password!', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Invalid email or password!', 'Close', {
        duration: 3000,
      });
    }
  }

  // Register method calling backend API
  register() {
    if (this.registerForm.valid) {
      const registerData = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
      };

      this.http.post(`${this.API_URL}/register`, registerData).subscribe(
        (response: any) => {
          console.log('Register successful:', response);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          this.router.navigate(['/budget-planner/login']);
        },
        (error) => {
          console.error('Register failed:', error);
          this.snackBar.open('Please fill in all fields correctly!', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Please fill in all fields correctly!', 'Close', {
        duration: 3000,
      });
    }
  }
}
