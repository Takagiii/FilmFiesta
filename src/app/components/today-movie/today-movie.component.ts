import { Component } from '@angular/core';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { Movie } from '../../interfaces/movie';
import { FilmsService } from '../../services/films/films.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-today-movie',
    standalone: true,
    imports: [MovieDetailComponent, TranslateModule],
    templateUrl: './today-movie.component.html',
    styleUrl: './today-movie.component.scss',
})
export class TodayMovieComponent {
    movie: Movie | null = null;

    constructor(protected fileService: FilmsService) {
        this.fileService.movie.subscribe((movie: Movie | null) => {
            if (movie) this.movie = movie;
        });

        this.fileService.getFreeMovie().then();
    }
}
