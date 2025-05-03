import { Component } from '@angular/core';
import { AuthService } from '../../servies/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private authService: AuthService) {}

  passwordsMatch(): boolean {
    return this.userData.password === this.confirmPassword;
  }

  onRegister() {
    if (this.passwordsMatch()) {
      this.authService.register(this.userData).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          alert('User registered successfully!');
        },
        (error) => {
          console.error('Error registering user:', error);
          alert('Error registering user. Please try again.');
        }
      );
    }
  }
}
