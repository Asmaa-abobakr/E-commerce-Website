import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
  }

  handleSubmitForm(form: any){
    this.authService.setAuthService(true);
    // route to the home page
    this.router.navigate(['']);
  }

}
