import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerErrorMsg:string=''
  registerSuccessMsg:string=''

  // form group
  registerForm = this.registerFb.group({
    //form array
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private registerFb:FormBuilder,private api:ApiService,private registerRouter:Router){

  }

  register(){
    
    if(this.registerForm.valid){
    let uname = this.registerForm.value.username
    let acno = this.registerForm.value.acno
    let pswd = this.registerForm.value.password
      //api call for register
      this.api.register(acno,pswd,uname)
      .subscribe(
        //response 200
        (result:any)=>{
        //alert(result.message)
        this.registerSuccessMsg = result.message
        setTimeout(() => {
           //redirect to login page
        this.registerRouter.navigateByUrl('')
        }, 5000);
       
      },
      //response 400
      (result:any)=>{
         this.registerErrorMsg=result.error.message
         setTimeout(() => {
          this.registerForm.reset()
          this.registerErrorMsg=""
         }, 3000);
      }
      )
    }
    else{
      alert('Invalid Form')
    }
    
  }
}
