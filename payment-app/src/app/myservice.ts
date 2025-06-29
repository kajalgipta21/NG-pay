import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  loggedInUser:RegisterResponseDetailsModel = new RegisterResponseDetailsModel();

   masterUrl="https://skytm-api.azurewebsites.net"
    baseUrl = 'http://localhost:3000';
   

  constructor(public http: HttpClient){ 
    const storedData = localStorage.getItem('userData');
    if(storedData) {
      const parsedData = JSON.parse(storedData);
      this.loggedInUser = parsedData;
    }
  }
  

  getBalance(data: string, Password: string):Observable<WalletDetailsModel> {
    return this.http.get<WalletDetailsModel>(this.masterUrl+"/api/Users/balance?phoneNumber="+data)
  }

  register(data: RegisterResponseDetailsModel):Observable<WalletDetailsModel> {
    return this.http.post<WalletDetailsModel>(this.masterUrl+"/api/Auth/signup",data);
  }

  addMoney(data:WalletModel):Observable<AddtoWalletResponseModel> {
    return this.http.post<AddtoWalletResponseModel>(this.masterUrl+"/api/Wallet/add",data) 
  }

  login(data:login):Observable<WalletDetailsModel> {
    return this.http.post<WalletDetailsModel>(this.masterUrl+"/api/Auth/login",data);
  }

  getTransactionHistory(data:TransactionModel):Observable<TransactionResponseModel> {
    return this.http.get<TransactionResponseModel>(this.masterUrl+"/api/Transactions/history?phoneNumber="+data)
  } 
  deleteTransactionHistory(data:TransactionModel):Observable<TransactionResponseModel> {
    return this.http.delete<TransactionResponseModel>(this.masterUrl+"/api/Transactions/history?phoneNumber="+data)
  } 
  paymoney(data:TransferRequestModel):Observable<TransferResponseModel> {
    return this.http.post<TransferResponseModel>(this.masterUrl+"/api/Transactions/pay",data)
  }

  getUserList():Observable<any> {
    return this.http.get<any>(this.masterUrl+"/api/Users/basic-list")
  }
}

export class login {
  phonenumber: string | undefined
  password: string | undefined
}



export class register {
  username: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  gender: string | undefined;
  password: string | undefined;
  imageUrl: string | undefined;
  isAdmin: boolean  = false ;
}


export class RegisterResponseModel {
  result:register | undefined;
  response: string | undefined;
  responseCode: string | undefined;
}

export class WalletDetailsModel {
  result!:RegisterResponseDetailsModel ;
  response: string | undefined;
  responseCode: string | undefined;
  token: any;
}

export class RegisterResponseDetailsModel{
  userId: number | undefined;
  username: string | undefined;
  email: string | undefined;
  phoneNumber!: string;
  gender: string | undefined;
  password: string | undefined;
  amount!: number ;
  imageUrl: string | undefined;
  createDate: string | undefined;  // or use `Date` if you parse it
  isAdmin: boolean | undefined;
}

export class WalletModel {
  phoneNumber: string | undefined;
  amount: number | undefined;
}

export class WalletResponseModel {
  message: string | undefined;
}

export class TransactionResponseModel {
  result!: TransactionModel[] ;
  response: string | undefined;
  responseCode: string | undefined;
}


export class TransactionModel {
  transactionId!: number;
  userId!: number;
  receiverId!: number;
  receiverName!: string;
  receiverPhoneNumber!: string;
  transactionType!: string | null;
  transactionDate!: string; // Consider using Date if parsing needed
  initialAmount!: number;
  transferAmount!: number;
}

export class TransferRequestModel {
  senderPhoneNumber!: string;
  receiverPhoneNumber!: string;
  amount!: number;
}

export class TransferResponseModel {
  result: any = null;
  response: string = '';
  responseCode: string = '';
}

export class AddtoWalletResponseModel {
  amount!: number;
  response!: string;
  responseCode!: string;
}



