import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { SlicePipe } from "../../shared/pipes/slice.pipe";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
