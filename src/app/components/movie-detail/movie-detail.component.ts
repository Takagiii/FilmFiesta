import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { TopbarComponent } from '../topbar/topbar.component';
import { LanguageService } from '../../services/language/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
    selector: 'app-movie-detail',
    standalone: true,
    imports: [TopbarComponent, TranslateModule, SafePipe],
    templateUrl: './movie-detail.component.html',
    styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent implements OnInit, AfterViewInit {
    @Input() movie: Movie | null = null;
    protected year: string = '';
    descriptionLang: string = '';

    @ViewChild('movieVideo') movieVideo?: ElementRef;

    constructor(
        private languageService: LanguageService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        this.languageService.language.subscribe((lang: string) => {
            if (lang === 'fr') {
                this.descriptionLang = this.movie?.description || '';
            } else {
                this.descriptionLang = this.movie?.eN_Description || '';
            }
        });
        if (this.movie) {
            this.year = new Date(this.movie.date_de_sortie).getFullYear().toString();
        }

        this.setMovieHeightToGetAGoodAspectRatio();
    }

    ngAfterViewInit() {
        this.setMovieHeightToGetAGoodAspectRatio();
    }

    @HostListener('window:resize', ['$event'])
    setMovieHeightToGetAGoodAspectRatio() {
        if (!this.movieVideo?.nativeElement) {
            return;
        }

        const width = this.movieVideo.nativeElement.offsetWidth;
        const height = (width / 16) * 9;

        this.movieVideo.nativeElement.style.height = height + 'px';
    }
}
