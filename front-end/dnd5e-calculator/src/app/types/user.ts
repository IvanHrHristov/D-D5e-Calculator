export interface User {
    characters: string[];
    _id: string;
    username: string;
    email: string;
    password: string;
}

export interface UserForAuth {
    username: string;
    email: string;
    password: string;
    id: string;
}

export interface ProfileDetails {
    username: string;
    email: string;
}