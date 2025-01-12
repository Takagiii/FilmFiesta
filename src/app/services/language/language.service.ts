import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    language = new BehaviorSubject<string>('fr');

    constructor() {
        const lang = localStorage.getItem('language');
        this.language.next(lang || 'fr');
    }

    toggleLanguage() {
        if (this.language.value === 'fr') {
            this.language.next('en');
            localStorage.setItem('language', 'en');
        } else {
            this.language.next('fr');
            localStorage.setItem('language', 'fr');
        }
    }

    getLanguage(): string {
        return this.language.value;
    }
}
