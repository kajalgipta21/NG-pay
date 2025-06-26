import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MyService } from '../myservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-money',
  templateUrl: './addmoney.html',
  styleUrls: ['./addmoney.css'],
  providers: [MessageService,MyService],
  imports: [
    FormsModule,
    HttpClientModule,
    ToastModule,
    CardModule,
    ButtonModule,
    InputTextModule,
  ]
})
export class AddMoney {
  amount: number = 0;
  phoneNumber: string = '';

  constructor(
    private myservice: MyService,
    private messageService: MessageService
  ) {}

  onAddMoney() {
    if (!this.amount || !this.phoneNumber) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Missing Info',
        detail: 'Please enter both amount and phone number'
      });
      return;
    }

    const data = {
      amount: this.amount,
      phoneNumber: this.phoneNumber
    };

    this.myservice.addMoney( data).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Money added successfully!'
        });
        this.amount = 0;
        this.phoneNumber = '';
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Transaction failed. Try again!'
        });
      }
    });
  }
}
