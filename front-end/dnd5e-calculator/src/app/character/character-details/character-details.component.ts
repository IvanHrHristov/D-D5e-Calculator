import { Component, OnInit } from '@angular/core';
import { Character } from '../../types/character';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { FormsModule, NgForm } from '@angular/forms';

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
  id: string = '';

  isEditMode: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['characterId'];

    this.apiService.getSingleCharacter(this.id).subscribe(character => {
      this.characterName = character.characterName;
      this.characterClass = character.characterClass;
      this.weaponDice = character.weaponDice;
      this.attacks = character.attacks;
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
}
