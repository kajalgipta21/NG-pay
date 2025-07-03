import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Balance, MyService } from '../myservice';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-checkb',
  templateUrl: './checkb.html',
  styleUrls: ['./checkb.css'],
  standalone: true,
  providers: [MyService, MessageService],
  imports: [
    FormsModule,
    HttpClientModule,
    ToastModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    CommonModule
  ]
})
export class Checkb implements OnInit {
  PhoneNumber: string = '';
  Password: string = '';
  message = '';
  success = false;
  phoneNumber: string | null = '';
  Balance = new Balance();
  balance: any = null;
  router: any;

  constructor(private myservice: MyService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.phoneNumber = sessionStorage.getItem("phonenumber");
    this.Balance.phonenumber = this.phoneNumber ;
  }

  checkBalanceuser() {
    if (!this.Balance.phonenumber) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Missing Info',
        detail: 'Phone number is required.'
      });
      return;
    }

    this.myservice.getBalance(this.Balance).subscribe({
      next: (res) => {
        if (res.response === "Record fetched Successfully !!") {
          this.balance = res.result.amount;
          this.message = 'Balance fetched successfully!';
          this.success = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.message
          });
          this.router.navigate(["/dashboard"])
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'Note',
            detail: 'No balance found.'
          });
        }
      },
      error: (err) => {
        this.balance = null;
        this.message = err.error?.message || 'Failed to fetch balance.';
        this.success = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.message
        });
      }
    });
  }
}
