import { Component, OnInit } from '@angular/core';
import { Character } from '../../types/character';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { User, UserForAuth } from '../../types/user';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent implements OnInit {
  characterName: string = '';
  characterClass: string = '';
  weaponDice: string = '';
  attacks: number = 1;
  owner: string = '';
  id: string = '';

  isEditMode: boolean = false;

  user: UserForAuth | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['characterId'];

    this.userService.getProfile().subscribe(user => {
      this.user = user;
    });

    this.apiService.getSingleCharacter(this.id).subscribe(character => {
      this.characterName = character.characterName;
      this.characterClass = character.characterClass;
      this.weaponDice = character.weaponDice;
      this.attacks = character.attacks;
      this.owner = character.owner;
    });
  }

  handleEdit(form: NgForm){
    if(form.invalid){
      return;
    }

    const { characterName, characterClass, weaponDice, attacks } = form.value;

    this.apiService.editCharacter(characterName, characterClass, weaponDice, attacks, this.id).subscribe(() => {
      this.edit();
    });
  }

  edit() {
    this.isEditMode = !this.isEditMode;
  }

  cancel(event: Event) {
    event.preventDefault();

    this.apiService.getSingleCharacter(this.id).subscribe(character => {
      this.characterName = character.characterName;
      this.characterClass = character.characterClass;
      this.weaponDice = character.weaponDice;
      this.attacks = character.attacks;
    });

    this.edit();
  }

  delete(event: Event) {
    event.preventDefault();

    this.apiService.deleteCharacter(this.id).subscribe(() => {
      this.router.navigate(['/characters']);
    });
  }
}
