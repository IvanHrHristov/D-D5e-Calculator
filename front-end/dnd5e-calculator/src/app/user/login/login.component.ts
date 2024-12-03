import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { DOMAINS } from '../../constants';
import { EmailDirective } from '../../directives/email.directive';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  domains = DOMAINS;
  errorMsg = null;
 
  constructor(private userService: UserService, private errorMsgService: ErrorMsgService, private router: Router) {}
  
  
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.errorMsgService.apiError$.subscribe((err: any) => {
      this.errorMsg = err?.message;
    });
    
    const { email, password } = form.value;

    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}