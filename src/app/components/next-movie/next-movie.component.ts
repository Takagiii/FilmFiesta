import { Component } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { AllMovies, Movie } from '../../interfaces/movie';
import { FilmsService } from '../../services/films/films.service';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-next-movie',
    standalone: true,
    imports: [TopbarComponent, MovieCardComponent, TranslateModule],
    templateUrl: './next-movie.component.html',
    styleUrl: './next-movie.component.scss',
})
export class NextMovieComponent {
    movies: AllMovies[] = [];
    isDisplayVote: boolean = false;
    isVoteOk: boolean = false;

    constructor(private filmsService: FilmsService, private auth: AuthService) {
        this.filmsService.movieToVotes.subscribe(movie => {
            if (!movie) return;
            this.movies = movie.slice(0, 2);
        });

        this.filmsService.getMoviesToVote().then();
    }

    handleVote(movie: AllMovies): void {
        this.filmsService.voteMovie(this.auth.id, movie.id).then(isVoteOk => {
            this.isVoteOk = isVoteOk;
            this.isDisplayVote = true;
        });
    }

    handleCloseVotePopup() {
        this.isDisplayVote = false;
    }
}
