import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TodayMovieComponent } from './components/today-movie/today-movie.component';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';
import { NextMovieComponent } from './components/next-movie/next-movie.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { RegisterComponent } from './components/register/register.component';
import { MovieComponent } from './components/movie/movie.component';
import { loginGuard } from './guards/auth.guard';
import { AccountComponent } from './components/account/account.component';
import { premiumGuard } from './guards/premium.guard';

export const routes: Routes = [
    { path: '', component: TodayMovieComponent },
    { path: 'account', component: AccountComponent, canActivate: [loginGuard] },
    { path: 'movie', component: MovieComponent, canActivate: [loginGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'create-account', component: RegisterComponent },
    { path: 'all', component: AllMoviesComponent, canActivate: [premiumGuard] },
    { path: 'next', component: NextMovieComponent, canActivate: [loginGuard] },
    { path: '403', component: ForbiddenComponent },
    { path: '**', component: NotFoundComponent },
];
