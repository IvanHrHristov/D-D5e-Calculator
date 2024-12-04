export interface Character {
    _id: string;
    characterName: string;
    characterClass: string;
    weaponDice: string;
    attacks: number;
    owner: string;
    likes: string[];
}