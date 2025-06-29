import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyService, RegisterResponseDetailsModel } from '../myservice';
import { MessageService } from 'primeng/api';
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
  standalone: true,
  providers: [MessageService, MyService],
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule
  ]
})
export class Register implements OnInit {
  user = {
    userid: '',
    username: '',
    email: '',
    phonenumber: '',
    gender: '',
    password: ''
  };

  isLogin: boolean = false;
  responseData: any;
  userCheck: boolean = false;

  constructor(
    private myservice: MyService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.myservice.loggedInUser?.phoneNumber) {
      this.router.navigate(['/dashboard']);
    }
  }

  register() {
    
    const model: RegisterResponseDetailsModel = {
      userId: Number(this.user.userid),

      username: this.user.username,
      email: this.user.email,
      phoneNumber: this.user.phonenumber,
      gender: this.user.gender,
      password: this.user.password,
      amount: 0,
      imageUrl: undefined,
      createDate: undefined,
      isAdmin: undefined
    };

    this.myservice.register(model).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registered',
          detail: 'Welcome!'
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Registration failed'
        });
      }
    });
  }
}
