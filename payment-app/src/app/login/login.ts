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

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  providers: [MessageService,MyService],
  imports:[PasswordModule,ToastModule,CardModule,CommonModule,FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule]
})
export class Login {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private myservice: MyService, private messageService: MessageService) {}

  login() {
    this.myservice.login(this.credentials).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Login Success', detail: 'Token: ' + res.token });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials' });
      }
    });
  }
}



