import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginErrorMsg:string=''
  loginSuccessStatus:boolean=false
  // form group
  loginForm = this.loginFb.group({
    //form array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private loginFb:FormBuilder,private api:ApiService,private loginRouter:Router){

  }
  login(){
    if(this.loginForm.valid){
      //get acno n pswd
      let acno = this.loginForm.value.acno
      let pswd = this.loginForm.value.password
      //make api call for login
      this.api.login(acno,pswd)
      .subscribe(
        //response 200
        (result:any)=>{
          this.loginSuccessStatus = true
          //store currentUser in local storage
          localStorage.setItem("currentUser",result.currentUser)
          //store token in local storage
          localStorage.setItem("token",result.token)
           //store currentAcno in local storage
           localStorage.setItem("currentAcno",result.currentAcno)
           
          setTimeout(() => {
            //redirect to dashboard
          this.loginRouter.navigateByUrl('dashboard')
          }, 3000);
        },
        //response 400
        (result:any)=>{
          this.loginErrorMsg = result.error.message
          setTimeout(() => {
            this.loginForm.reset()
            this.loginErrorMsg=""
          }, 5000);
        }
      )

    }
    else{
      alert('Invalid Form')
    }
  }

}
