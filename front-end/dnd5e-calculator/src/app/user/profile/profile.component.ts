import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ProfileDetails } from '../../types/user';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { SlicePipe } from "../../shared/pipes/slice.pipe";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, SlicePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  isEditMode: boolean = false;

  profileDetails: ProfileDetails = {
    username: '',
    email: '',
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),  
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
  })
  
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user) => {
      if (user) {
        const {username, email} = user;
        this.profileDetails = {username, email};
        this.form.setValue({ username, email });
      }
    });
  }

  edit() {
    this.isEditMode = !this.isEditMode;
  }

  handleSaveProfile() {
    if(this.form.invalid){
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;

    const {username, email} = this.profileDetails;

    this.userService.updateProfile(username, email).subscribe(() => {
      this.edit();
    });
  }

  cancel(event: Event) {
    event.preventDefault();

    const {username, email} = this.userService.user!;

    this.form.setValue({
      username, 
      email,
    });

    this.edit();
  }
}