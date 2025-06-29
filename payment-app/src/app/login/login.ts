import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';
import { MyService } from '../myservice';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  credentials = {
    phonenumber: '',
    password: ''
  };
  router: any;
  phonenumber: any;
  password: any;
  
 
  constructor(private myservice: MyService, private messageService: MessageService) {}

  login() {
    this.myservice.login({ phonenumber: this.phonenumber, password: this.password }).subscribe({
      next: (res) => {
        console.log('Login success:', res.token);

        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: `Token: ${res.token}`
        });
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





