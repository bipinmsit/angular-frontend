import { Component } from '@angular/core';
import { AuthService } from '../../servies/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  userData = {
    username: '',
    password: '',
  };

  confirmPassword: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  passwordsMatch(): boolean {
    return this.userData.password === this.confirmPassword;
  }

  onRegister() {
    console.log('User data:', this.userData);
    if (this.passwordsMatch()) {
      this.authService.register(this.userData).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.successMessage = 'User registered successfully!';
        },
        (error) => {
          console.error('Error registering user:', error);
          alert('Error registering user. Please try again.');
        }
      );
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
