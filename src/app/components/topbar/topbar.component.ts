import { Component, OnDestroy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { AuthService } from '../../services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language/language.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [NgOptimizedImage, ProfileComponent, TranslateModule, RouterLink],
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnDestroy {
    flagPath: string = './assets/icons/france.png';

    constructor(
        protected authService: AuthService,
        private languageService: LanguageService,
        protected router: Router
    ) {
        this.setFlag();
    }

    ngOnDestroy() {
        this.languageService.language.unsubscribe();
    }

    changeLanguage() {
        this.languageService.toggleLanguage();
        this.setFlag();
    }

    setFlag() {
        if (this.languageService.getLanguage() === 'en') {
            this.flagPath = './assets/icons/usa.png';
        } else {
            this.flagPath = './assets/icons/france.png';
        }
    }
}
