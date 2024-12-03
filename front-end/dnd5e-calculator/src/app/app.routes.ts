import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { CreateCharacterComponent } from './character/create-character/create-character.component';
import { CharacterListComponent } from './character/character-list/character-list.component';
import { CharacterDetailsComponent } from './character/character-details/character-details.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},

    {path: 'characters', component: CharacterListComponent},
    {path: 'characters/create', component: CreateCharacterComponent},
    {path: 'characters/details/:characterId', component: CharacterDetailsComponent},

    {path: 'error', component: ErrorMsgComponent},
    {path: '404', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/404'},
];
