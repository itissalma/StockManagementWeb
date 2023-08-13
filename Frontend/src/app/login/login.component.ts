import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JWTTokenResponse } from '../models/jwt-token-response.models';
import { Router } from '@angular/router';
import { LoginStatusService } from '../services/login-status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private loginStatusService: LoginStatusService) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: JWTTokenResponse) => {
        // Check if the token is present in the response
        if (response.token) {
          // Login successful, handle the JWT token response
          console.log('JWT Token:', response.token);
          // Set the token in local storage
          localStorage.setItem('token', response.token);
          //console.log("the token is ",localStorage.getItem('token') )
          // Implement the logic to redirect to the stocks page
          // For example:
          this.router.navigate(['/stock']);
        } else {
          console.log('No JWT token found in the response.');
          // Handle the case where the token is not present in the response
        }
      },
      error: (error) => {
        // Login failed, display an error message
        this.errorMessage = 'Invalid email or password.';
        console.log("email is ", this.email);
        console.log("password is ", this.password);
      }
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.loginStatusService.setIsLoginPage(true);
  }
  
  ngOnDestroy(): void {
    this.loginStatusService.setIsLoginPage(false);

  }
  
  
}
