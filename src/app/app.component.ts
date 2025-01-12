import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language/language.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, TopbarComponent, TranslateModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
    title = 'FilmFiesta';

    constructor(
        translate: TranslateService,
        private languageService: LanguageService
    ) {
        translate.setDefaultLang('fr');
        this.languageService.language.subscribe((lang: string) => {
            translate.use(lang);
        });
    }

    ngOnDestroy(): void {
        this.languageService.language.unsubscribe();
    }
}
