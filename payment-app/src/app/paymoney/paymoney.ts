import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyService, TransferRequestModel } from '../myservice';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-paymoney',
  templateUrl: './paymoney.html',
  styleUrls: ['./paymoney.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  providers: [MyService, MessageService]
})
export class PayMoney implements OnInit {

  phoneNumber: string | null = '';
  TransferRequestModel = new TransferRequestModel();
  reciverphoneNumber: string = '';
  message: string = '';
  success: boolean = false;
  router: any;

  constructor(
    public myservice: MyService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.phoneNumber = sessionStorage.getItem("phonenumber");
  }

  payMoney() {
    if (!this.TransferRequestModel.amount || !this.TransferRequestModel.receiverPhoneNumber) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Missing Info',
        detail: 'Please enter both amount and receiver phone number'
      });
      return;
    }

    this.TransferRequestModel.phoneNumber = this.phoneNumber ?? '';
    this.TransferRequestModel.receiverPhoneNumber = this.reciverphoneNumber;

    this.myservice.paymoney(this.TransferRequestModel).subscribe({
      next: (res) => {
      if (res.response === "Amount transfered successfully") {
          
            alert("Amount transfered successfully");
            this.router.navigate(["/dashboard"])
          
          //this.message = res.message || 'Payment successful!';
         // this.success = true;
         // this.messageService.add({
        //    severity: 'success',
        //    summary: 'Success',
        //    detail: this.message
        //  });
          this.router.navigate(["/dashboard"])
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'Response',
            detail: res.message || 'Something happened'
          });
        }
      },
      error: (err) => {
        this.message = err.error?.message || 'Payment failed. Please try again.';
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
