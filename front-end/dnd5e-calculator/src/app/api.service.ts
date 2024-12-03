import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from './types/character';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCharacters() {
    return this.http.get<Character[]>(`/api/characters`);
  }

  createCharacter(characterName: string, characterClass: string, weaponDice: string, attacks: number) {
    const payload = {characterName, characterClass, weaponDice, attacks};

    return this.http.post<Character>(`/api/characters/create`, payload);
  }
}
