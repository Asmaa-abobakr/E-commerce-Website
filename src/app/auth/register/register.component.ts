import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitFlag : boolean = false;
  passPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*@%$#]).{8,}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  userNamePattern = "^[A-Za-z0-9]+$";

    constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
    ) {
    this.registerForm = this.fb.group({
      Name        :  ['', Validators.required],
      email       :  ['', [Validators.required,  Validators.pattern(this.emailPattern)]],
      username    :  ['', [Validators.required,  Validators.pattern(this.userNamePattern)]],
      password    :  ['', [Validators.required, Validators.pattern(this.passPattern)]],
      conPassword :  ['', [Validators.required, Validators.pattern(this.passPattern)]],
    })
   }

  ngOnInit(): void {
  }

  get formControls(){
    return this.registerForm.controls;
  }

  handleSubmit(){
    // rais submit flag 
    this.submitFlag = true;
    this.authService.setAuthService(true);
    // route to home page
    this.router.navigate(['']);
  }

  unsaveCheck(){
    if(this.formControls['Name'].dirty || this.formControls['email'].dirty
     || this.formControls['username'].dirty || this.formControls['password'].dirty){
      return confirm("Do you really want to discard these changes?");
    }
    else{
      return true;
    }
  }

}
