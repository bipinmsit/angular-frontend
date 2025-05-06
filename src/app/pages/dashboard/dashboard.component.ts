import { Component } from '@angular/core';
import { AuthService } from '../../servies/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  selectedFile: File | null = null;

  constructor(private authService: AuthService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    console.log('Selected file:', this.selectedFile, this.selectedFile?.name);
    if (this.selectedFile) {
      this.authService.ingestDocument(this.selectedFile).subscribe({
        next: (response) => {
          console.log('File uploaded successfully:', response);
          alert('File uploaded successfully!');

          // Clear the file input and reset selectedFile
          this.selectedFile = null;
          const fileInput = document.getElementById(
            'fileInput'
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = ''; // Reset the file input
          }
        },
        error: (error) => {
          console.error('File upload failed:', error);
          alert('File upload failed. Please try again.');
        },
      });
    } else {
      alert('Please select a file to upload.');
    }
  }
}
