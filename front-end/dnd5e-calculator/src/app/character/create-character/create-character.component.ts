import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.css'
})
export class CreateCharacterComponent {
  
  constructor(private apiService: ApiService, private router: Router) {}

  create(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { characterName, characterClass, weaponDice, attacks } = form.value;

    this.apiService.createCharacter(characterName, characterClass, weaponDice, attacks).subscribe(() => {
      this.router.navigate(['/characters']);
    })
  }
}
