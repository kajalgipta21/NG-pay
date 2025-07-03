import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { MyService, WalletModel } from '../myservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-money',
  templateUrl: './addmoney.html',
  styleUrls: ['./addmoney.css'],
  providers: [MessageService, MyService],
  standalone: true, 
   imports:[ FormsModule,
    ToastModule,
    CardModule,
    ButtonModule,
    InputTextModule,
  ]
})
export class AddMoney implements OnInit {

  phoneNumber: any;
  walletModel = new WalletModel();

  constructor(
    public myservice: MyService,
    public router:Router
    // public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.phoneNumber = sessionStorage.getItem("phonenumber");
  }

  onAddMoney() {
    
    this.walletModel.phoneNumber = this.phoneNumber;

    // if (!this.walletModel.amount || !this.walletModel.phoneNumber) {
    //   this.messageService.add({
    //     severity: 'warn',
    //     summary: 'Missing Info',
    //     detail: 'Please enter amount'
    //   });
    //   return;
    // }

    this.myservice.addMoney(this.walletModel).subscribe({
      next: (res) => {
        if(res.response == "amount added successfully"){
          alert("Added Money to wallet");
          this.router.navigate(["/dashboard"])
        }

        // if (res.response === "amount added successfully") {
        //   this.messageService.add({
        //     severity: 'success',
        //     summary: 'Success',
        //     detail: 'Amount added successfully'
        //   });
        // } else {
        //   this.messageService.add({
        //     severity: 'warn',
        //     summary: 'Failed',
        //     detail: res.response
        //   });
        // }
      },
      // error: () => {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Error',
      //     detail: 'Transaction failed. Try again!'
      //   });
      // }
    });
  }
}
