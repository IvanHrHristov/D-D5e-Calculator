import { User } from "./user";

export interface Character {
    characterName: string;
    characterClass: string;
    weaponDice: string;
    attacks: number;
    userId: User;
}