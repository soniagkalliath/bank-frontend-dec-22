import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapse:boolean = true
  user:string=''
  currentAcno:any
  balance:number=0
  transferSuccessMsg:string=''
  transferErrorMsg:string=''
  logoutStatus:boolean=false
  acno:any
  deleteConfirmStatus:boolean=false
  deleteSuccessMsg:string=""
  //form group
  fundTransferForm = this.fb.group({
    creditAcno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private fb:FormBuilder,private api:ApiService,private dashboardRouter:Router){

  }

  ngOnInit(): void {
    // if(!localStorage.getItem('token')){
    //   alert('Please log in')
    //   this.dashboardRouter.navigateByUrl('')
    // }
    if(localStorage.getItem('currentUser')){
     this.user = localStorage.getItem('currentUser')||''
    }
    if(localStorage.getItem('currentAcno')){
     this.currentAcno = localStorage.getItem('currentAcno')
    }
  }

  collapse(){
    this.isCollapse = !this.isCollapse
  }

  //get balance
  getBalance(){
    //api call
    this.api.getBalance(this.currentAcno)
    .subscribe(
      (result:any)=>{
       this.balance = result.balance
    },
    (result:any)=>{
      alert(result.error.message)
    }
    )
  }

  //fund transfer
  transfer(){

    if(this.fundTransferForm.valid){
      //get details from fund transfer form
      let creditAcno = this.fundTransferForm.value.creditAcno
      let pswd = this.fundTransferForm.value.password
      let amount = this.fundTransferForm.value.amount
      // call api 
      this.api.fundTransfer(creditAcno,pswd,amount)
      .subscribe(
        //response 200
        (result:any)=>{
          console.log(result);
          this.transferSuccessMsg = result.message
          setTimeout(()=>{
            this.transferSuccessMsg=""
           },5000)
        },
        (result:any)=>{
          console.log(result.error)
          //error
          this.transferErrorMsg = result.error.message
          setTimeout(()=>{
           this.closeFundTransferForm()
          },5000)
        }
      )
    }
    else{
      alert('Invalid Form!!!')
    }
  }

  //to reset form
  closeFundTransferForm(){
    this.fundTransferForm.reset()
    this.transferErrorMsg=""
    this.transferSuccessMsg=""
  }

  //logout
  logout(){
    //remove all data stored in local storage for this particular user
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    localStorage.removeItem('currentAcno')

    //update logoutStatus as true
    this.logoutStatus=true
    //wait 2 sec to redirect
    setTimeout(() => {
    //navigate to login
    this.dashboardRouter.navigateByUrl('')
    }, 3000);

  }

  //deleteAcnoNavBar
  deleteAcnoNavBar(){
    //data to be shared with child
    this.acno = localStorage.getItem("currentAcno")
    this.deleteConfirmStatus = true
  }

  //cancelDeleteConfirm()
  cancelDeleteConfirm(){
    this.acno =""
    this.deleteConfirmStatus =  false
  }

  //deleteFromParent()
  deleteFromParent(){
    this.api.deleteAcno()
    .subscribe((result:any)=>{
      //remove all data stored in local storage for this particular user
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    localStorage.removeItem('currentAcno')
    
    this.deleteSuccessMsg = result.message
    this.deleteConfirmStatus = true
    //wait 3 sec to redirect
    setTimeout(() => {
      //navigate to login
      this.dashboardRouter.navigateByUrl('')
      }, 5000);
    })
  }
}
