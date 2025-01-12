import { Component, Input } from '@angular/core';
import { AllMovies } from '../../interfaces/movie';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-movie-card',
    standalone: true,
    imports: [NgOptimizedImage, NgClass],
    templateUrl: './movie-card.component.html',
    styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
    @Input() movieObject!: AllMovies;
    @Input() isBig: boolean = false;
    @Input() isDisplayVote?: boolean = false;
}
