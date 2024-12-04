import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from './types/character';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getSingleCharacter(characterId: string) {
    return this.http.get<Character>(`/api/characters/details/${characterId}`);
  }

  getCharacters() {
    return this.http.get<Character[]>('/api/characters');
  }

  createCharacter(characterName: string, characterClass: string, weaponDice: string, attacks: number) {
    const payload = {characterName, characterClass, weaponDice, attacks};

    return this.http.post<Character>('/api/characters/create', payload);
  }

  editCharacter(characterName: string, characterClass: string, weaponDice: string, attacks: number, characterId: string){
    const payload = {characterName, characterClass, weaponDice, attacks};

    return this.http.put<Character>(`/api/characters/edit/${characterId}`, payload);
  }

  deleteCharacter(characterId: string) {
    return this.http.delete<Character>(`/api/characters/delete/${characterId}`);
  }
}
