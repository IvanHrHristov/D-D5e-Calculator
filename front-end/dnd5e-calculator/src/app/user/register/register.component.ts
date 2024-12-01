import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { username, email, password, rePassword} = form.value;

    this.userService.register(username, email, password, rePassword).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
