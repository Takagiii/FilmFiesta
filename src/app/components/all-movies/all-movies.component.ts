import {
    Component,
    ElementRef,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { AllMovies, Movie } from '../../interfaces/movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { FilmsService } from '../../services/films/films.service';
import { MultiselectDropdownComponent } from '../multiselect-dropdown/multiselect-dropdown.component';
import { BehaviorSubject } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-all-movies',
    standalone: true,
    imports: [
        TopbarComponent,
        MovieCardComponent,
        MultiselectDropdownComponent,
        TranslateModule,
        RouterLink,
    ],
    templateUrl: './all-movies.component.html',
    styleUrl: './all-movies.component.scss',
    providers: [{ provide: FilmsService }],
})
export class AllMoviesComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild('searchInput') searchInput?: ElementRef;

    movies: AllMovies[] = [];
    filterMovies: AllMovies[] = [];
    isLoaded: boolean = false;

    genres: string[] = [];
    genreSelected: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    constructor(
        private route: Router,
        private filmsService: FilmsService
    ) {}

    ngOnInit() {
        this.filmsService.movies.subscribe((movies: AllMovies[]) => {
            this.movies = movies;
            this.filterMovies = movies;
        });

        this.filmsService.genres.subscribe((genres: string[]) => (this.genres = genres));

        this.genreSelected.subscribe(_ => (this.updateFilters()));

        this.isLoaded = false;
        this.filmsService.getMovies().then(_ => (this.isLoaded = true));
        this.filmsService.getGenres().then();
    }

    ngOnDestroy() {
        this.filmsService.movies.unsubscribe();
        this.filmsService.genres.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('searchInput' in changes || 'genreSelected' in changes) {
            this.updateFilters();
        }
    }

    getSelectedGenreId(): string[] {
        let genre: string[] = [];
        const isGenreSelected: boolean = this.genreSelected.value.length > 0;
        if (isGenreSelected) {
            this.genreSelected.value.forEach(g => genre.push(this.genres.indexOf(g).toString()));
        }
        return genre;
    }

    updateFilters(): void {
        const searchTerm: string | null = this.searchInput?.nativeElement.value || null;
        const genres: string[] = this.getSelectedGenreId();
        this.filmsService.getMovies(searchTerm, genres).then();
    }

    onSearchChange(): void {
        this.updateFilters();
    }
}
