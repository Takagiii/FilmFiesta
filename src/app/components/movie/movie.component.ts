import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FilmsService } from '../../services/films/films.service';
import { Movie } from '../../interfaces/movie';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-movie',
    standalone: true,
    imports: [MovieDetailComponent, NotFoundComponent, TranslateModule],
    templateUrl: './movie.component.html',
    styleUrl: './movie.component.scss',
    providers: [{ provide: FilmsService }],
})
export class MovieComponent implements OnDestroy {
    movie: Movie | null = null;
    isError: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private filmService: FilmsService
    ) {
        this.route.queryParams.subscribe((params: Params) => {
            const movieId: number = parseInt(params['id']);
            this.filmService.movie.subscribe((movie: Movie | null) => (this.movie = movie));
            this.filmService.getMovieById(movieId).then((res: boolean) => (this.isError = !res));
        });
    }

    ngOnDestroy(): void {
        this.filmService.movie.unsubscribe();
    }
}
