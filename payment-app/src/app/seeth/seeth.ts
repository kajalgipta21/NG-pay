import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MyService, TransactionModel } from '../myservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seeth',
  templateUrl: './seeth.html',
  styleUrls: ['./seeth.css'],
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    
  ],
  providers: [MyService]
})
export class Seeth implements OnInit {
  phoneNumber: string = '';
  transactions: any[] = [];
  searched: boolean = false;
  TransactionModel: TransactionModel = new TransactionModel();
  router: any;

  constructor(public myservice: MyService) {}

  ngOnInit(): void {
    // Get phoneNumber from sessionStorage
    this.phoneNumber = sessionStorage.getItem('phonenumber') || '';
    this.TransactionModel.PhoneNumber = this.phoneNumber;
  }

  getTransactions() {
    this.myservice.getTransactionHistory(this.TransactionModel.PhoneNumber).subscribe({
      next: (res) => {
        if (res.response === "History fetched successfully") {
          this.transactions = res.result || [];  // Assuming API returns `result`
          this.searched = true;
          this.router.navigate(["/dashboard"])
        } else {
          this.transactions = [];
          this.searched = true;
        }
      },
      error: (err) => {
        this.transactions = [];
        this.searched = true;
        console.error('Error fetching transaction history:', err);
      }
    });
  }
}
