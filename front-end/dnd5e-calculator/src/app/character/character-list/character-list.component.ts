import { Component, OnInit } from '@angular/core';
import { Character } from '../../types/character';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit{
  characters: Character[] = [];
  isLoading = true;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }
  
  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.apiService.getCharacters().subscribe(characters => {
      this.characters = characters;
      this.isLoading = false;
    });
  }
}
