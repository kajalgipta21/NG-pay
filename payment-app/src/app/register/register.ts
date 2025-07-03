import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyService, register, RegisterResponseDetailsModel } from '../myservice';
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
    
    HttpClientModule
  ]
})
export class Register implements OnInit {


  isLogin: boolean = false;
  responseData: any;
  userCheck: boolean = false;

  constructor(
    public myservice: MyService,
    private messageService: MessageService,
    private router: Router
  ) {}
 user:register = new register();
 data:any;
  ngOnInit(): void {
    if (Boolean(sessionStorage.getItem("isLoggedIn"))) {
      this.router.navigate(['/dashboard']);
    }
  }

  adduser() {
    this.myservice.register(this.user).subscribe(data=> {
      this.data = data;
      if(this.data.response=="Registered Successfully !!")
      {
        this.messageService.add({
          severity: 'success',
          summary: 'Registered Successful'
        });
        this.router.navigate(['/login']);
      }
    });
  }
}
