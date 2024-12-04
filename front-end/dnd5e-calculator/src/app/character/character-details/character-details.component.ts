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

  isEditMode: boolean = false;

  hasLiked = signal(false);
  currentUserLiked = signal(0);

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {
    return this.userService.user?._id!;
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
