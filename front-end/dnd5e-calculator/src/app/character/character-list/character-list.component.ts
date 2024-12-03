import { Component, OnInit } from '@angular/core';
import { Character } from '../../types/character';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';

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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCharacters().subscribe(characters => {
      this.characters = characters;
      this.isLoading = false;
    });
  }
}
