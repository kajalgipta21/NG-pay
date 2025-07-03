import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';
import { login, MyService } from '../myservice';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  providers: [MessageService,MyService],
  imports:[PasswordModule,ToastModule,CardModule,CommonModule,FormsModule,RouterLink,RouterLinkActive,
    HttpClientModule,
    
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule]
})
export class Login {
  
  
 
  constructor(public myservice: MyService, 
    private messageService: MessageService,
  private router:Router) {}

  credentials:login = new login(); 
  phonenumber: any;
  password: any;
  login() {
    this.myservice.login(this.credentials).subscribe({
      next: (res) => {
        if(res.response=="Login Successfully !!")
        {
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: `Token: ${res.token}`
          });
          sessionStorage.setItem("phonenumber",res.result.phoneNumber);
          sessionStorage.setItem("isLoggedIn","true");
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid username or password'
        });
      }
    });
  }
}





