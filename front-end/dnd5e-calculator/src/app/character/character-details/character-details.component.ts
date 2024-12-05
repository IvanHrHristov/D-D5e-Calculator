import { Component, OnInit, signal } from '@angular/core';
import { Character } from '../../types/character';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { User, UserForAuth } from '../../types/user';
import { SlicePipe } from "../../shared/pipes/slice.pipe";

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [FormsModule, SlicePipe],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent implements OnInit {
  characterName: string = '';
  characterClass: string = '';
  weaponDice: string = '';
  attacks: number = 1;
  owner: string = '';
  likes: string[] = [];
  id: string = '';

  advantageIsChecked: boolean = false;
  classFeatureIsChecked: boolean = true;
  averageDamageForWeaponDice: number = 0;
  chanceToHit: number = 0.60;
  abilityModifier: number = 3;
  proficiencyBonus: number = 2;
  targetsAC: number = 14;
  classFeatureDamagePerAttack: number = 0;
  classFeatureDamagePerRound: number = 0;
  additionalAttacks: number = 0;

  isEditMode: boolean = false;

  hasLiked = signal(false);
  currentUserLiked = signal(0);

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {
    return this.userService.user?._id!;
  }

  get DPR(): number {
    switch (this.weaponDice) {
      case "d4":
        this.averageDamageForWeaponDice = 2.5;
        break;
      case "d6":
        this.averageDamageForWeaponDice = 3.5;
        break;
      case "d8":
        this.averageDamageForWeaponDice = 4.5;
        break;   
      case "d10":
        this.averageDamageForWeaponDice = 5.5;
        break;
      case "d12":
        this.averageDamageForWeaponDice = 6.5;
        break;
      case "2d6":
        this.averageDamageForWeaponDice = 7.0;
        break; 
      default:
        this.averageDamageForWeaponDice = 0;
        break;
    }

    if (this.advantageIsChecked) {
      this.chanceToHit = parseFloat((1 - Math.pow((((this.targetsAC - this.abilityModifier - this.proficiencyBonus) - 1) / 20), 2)).toFixed(2));
    }else {
      this.chanceToHit = parseFloat(((21 - (this.targetsAC - this.abilityModifier - this.proficiencyBonus)) / 20).toFixed(2));
    }

    if (this.classFeatureIsChecked) {
      switch (this.characterClass) {
        case "barbarian":
          this.classFeatureDamagePerAttack = 2;
          this.classFeatureDamagePerRound = 0;
          this.additionalAttacks = 0;
          break;
        case "fighter":
          this.classFeatureDamagePerAttack = 0;
          this.classFeatureDamagePerRound = 0;
          this.additionalAttacks = (this.attacks / 4);
          break;
        case "monk":
          this.classFeatureDamagePerAttack = 0;
          this.classFeatureDamagePerRound = 0;
          this.additionalAttacks = 2;
          break;   
        case "paladin":
          this.classFeatureDamagePerAttack = 0;
          this.classFeatureDamagePerRound = 9;
          this.additionalAttacks = 0;
          break;
        case "ranger":
          this.classFeatureDamagePerAttack = 3.5;
          this.classFeatureDamagePerRound = 0;
          this.additionalAttacks = 0;
          break;
        case "rogue":
          this.classFeatureDamagePerAttack = 0;
          this.classFeatureDamagePerRound = 10.5;
          this.additionalAttacks = 0;
          break; 
        default:
          this.classFeatureDamagePerAttack = 0;
          this.classFeatureDamagePerRound = 0;
          this.additionalAttacks = 0;
          break;
      }
    }else {
      this.classFeatureDamagePerAttack = 0;
      this.classFeatureDamagePerRound = 0;
      this.additionalAttacks = 0;
    }

    const result = parseFloat((((this.classFeatureDamagePerAttack + this.averageDamageForWeaponDice + this.abilityModifier) * (this.attacks + this.additionalAttacks) + this.classFeatureDamagePerRound) * this.chanceToHit).toFixed(2));

    return result;
  }

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['characterId'];

    this.apiService.getSingleCharacter(this.id).subscribe(character => {
      this.characterName = character.characterName;
      this.characterClass = character.characterClass;
      this.weaponDice = character.weaponDice;
      this.attacks = character.attacks;
      this.owner = character.owner;
      this.likes = character.likes;

      this.hasLiked.set(this.likes.includes(this.userId));
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

  delete() {
    this.apiService.deleteCharacter(this.id).subscribe(() => {
      this.router.navigate(['/characters']);
    });
  }

  like() {
    this.apiService.likeCharacter(this.id).subscribe(() => {
      this.hasLiked.set(true);
      this.currentUserLiked.set(1);
    });
  }

  removeLike() {
    this.apiService.removeLikeFromCharacter(this.id).subscribe(() => {
      this.hasLiked.set(false);
      this.currentUserLiked.set(0);

      this.likes = this.likes.filter(like => like !== this.userId);
    });
  }
}
