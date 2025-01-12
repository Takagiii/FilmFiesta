import { Injectable } from '@angular/core';
import { AllMovies, Movie } from '../../interfaces/movie';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FilmsService {
    public movies = new BehaviorSubject<AllMovies[]>([]);
    public genres = new BehaviorSubject<string[]>([]);
    public movie = new BehaviorSubject<Movie | null>(null);
    public movieToVotes = new BehaviorSubject<AllMovies[]>([]);

    constructor(private http: HttpClient) {}

    async getMovies(search?: string | null, genres?: string[] | null): Promise<boolean> {
        let params = new HttpParams();
        if (search) params = params.set('Research', search);
        if (genres) {
            genres.forEach(g => {
                params = params.append('Genres', g);
            });
        }

        try {
            const request = this.http.get(`${environment.apiUrl}/Movie`, { params });
            const response = await lastValueFrom(request);
            this.movies.next(response as AllMovies[]);
            return true;
        } catch (_) {
            this.movies.next([]);
            return false;
        }
    }

    async getGenres(): Promise<void> {
        try {
            const request = this.http.get(`${environment.apiUrl}/Genre`);
            const response = await lastValueFrom(request);
            this.genres.next(response as string[]);
        } catch (_) {
            this.genres.next([]);
        }
    }

    async getMovieById(id: number): Promise<boolean> {
        try {
            const request = this.http.get(`${environment.apiUrl}/Movie/${id}`);
            const response = await lastValueFrom(request);
            this.movie.next(response as Movie);
            return true;
        } catch (_) {
            this.movie.next(null);
            return false;
        }
    }

    async getFreeMovie(): Promise<void> {
        try {
            const request = this.http.get(`${environment.apiUrl}/Movie/Free`);
            const response = await lastValueFrom(request);
            this.movie.next(response as Movie);
        } catch (_) {
            this.movie.next(null);
        }
    }

    async getMoviesToVote(): Promise<void> {
        const params = new HttpParams().set('Status', 'Voted');

        try {
            const request = this.http.get(`${environment.apiUrl}/Movie`, { params });
            const response = await lastValueFrom(request);
            this.movieToVotes.next(response as AllMovies[]);
        } catch (_) {
            this.movies.next([]);
        }
    }

    async voteMovie(userId: number, movieId: number): Promise<boolean> {
        try {
            const request = this.http.post(`${environment.apiUrl}/Movie/Vote/`, {
                userId: userId,
                movieId: movieId,
            });
            await lastValueFrom(request);

            return true;
        } catch (_) {
            return false;
        }
    }
}
