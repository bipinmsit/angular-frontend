import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servies/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password,
    };

    console.log('Login data:', loginData);
    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Store the token in local storage or handle it as needed
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        // Save username to display in the navbar
        localStorage.setItem('username', this.username);

        // Redirect to the home page after successful login
        // this.router.navigate(['/']);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Invalid username or password. Please try again.');
      },
    });
  }
}
