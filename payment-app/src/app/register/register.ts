import { Component } from '@angular/core';

import { MyService } from '../myservice';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  providers: [MessageService,MyService],
  imports:[
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,ToastModule,CardModule,CommonModule,FormsModule,RouterLink,RouterLinkActive,
    HttpClientModule]
})
export class Register {
  user = {
    username: '',
    email: '',
    phonenumber:'',
    gender:'',
    password: ''
  };
  isLogin: any;

  constructor(private myservice: MyService, private messageService: MessageService) {}

  register() {
    this.myservice.register(this.user).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Registered', detail: 'Welcome!' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Registration failed' });
      }
    });
  }
  toggleForm() {
    this.isLogin = !this.isLogin;
  }
  
}



