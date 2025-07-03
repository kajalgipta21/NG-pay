import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyService, TransactionModel } from '../myservice';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deleteth',
  templateUrl: './deleteth.html',
  styleUrls: ['./deleteth.css'],
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    ToastModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    CommonModule
  ],
  providers: [MyService]
})
export class Deleteth implements OnInit {
  phoneNumber:any;
  transactions: any[] = [];
  searched: boolean = false;
  message = '';
  success = false;
  TransactionModel: TransactionModel = new TransactionModel();
  router: any;

  constructor(public myservice:MyService) {}

  ngOnInit(): void {
    this.phoneNumber = sessionStorage.getItem("phonenumber");
  }

  getTransactions() {
    this.TransactionModel.PhoneNumber = this.phoneNumber;

    this.myservice.getTransactionHistory(this.phoneNumber).subscribe({
      next: (res: any) => {
        if (res.response === 'History fetched successfully') {
          this.transactions = res.result || []; // assuming `res.result` has the array
          this.message = res.response;
          this.success = true;
          this.router.navigate(["/dashboard"])
        }
        this.searched = true;
      },
      error: (err) => {
        this.transactions = [];
        this.searched = true;
        this.message = 'Failed to fetch transactions.';
        this.success = false;
        console.error('Error fetching transaction history:', err);
      }
    });
  }

  deleteTransactions() {
    if (!confirm('Are you sure you want to delete all transactions for this number?')) return;

    this.TransactionModel.PhoneNumber = this.phoneNumber;

    this.myservice.deleteTransactionHistory(this.phoneNumber).subscribe({
      next: (res: any) => {
        if (res.response === 'Transactions deleted successfully')
        this.message = res.message || 'Transactions deleted successfully.';
        this.success = true;
        this.transactions = [];
        this.router.navigate(["/dashboard"])
      },
      error: (err) => {
        this.message = 'Failed to delete transactions.';
        this.success = false;
      }
    });
  }
  delete(){
    
  }
}
