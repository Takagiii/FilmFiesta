import { Component, ElementRef, Input } from '@angular/core';
import { BehaviorSubject, generate } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language/language.service';

@Component({
    selector: 'app-multiselect-dropdown',
    standalone: true,
    templateUrl: './multiselect-dropdown.component.html',
    styleUrl: './multiselect-dropdown.component.scss',
    imports: [TranslateModule],
})
export class MultiselectDropdownComponent {
    @Input() options: string[] = [];
    @Input() placeholder: string = 'Sélectionner...';
    @Input() selectedLabel?: BehaviorSubject<string[]>;

    selectedOptions: string[] = [];
    isDropdownOpen = false;

    constructor(private elementRef: ElementRef) {}

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
        if (this.isDropdownOpen) {
            document.addEventListener('click', this.handleOutsideClick);
        } else {
            document.removeEventListener('click', this.handleOutsideClick);
        }
    }

    handleOutsideClick = (event: MouseEvent) => {
        const isOutside = !this.elementRef.nativeElement.contains(event.target as Node);
        if (isOutside) {
            this.isDropdownOpen = false;
            document.removeEventListener('click', this.handleOutsideClick);
        }
    };

    isSelected(option: string): boolean {
        return this.selectedOptions.indexOf(option) > -1;
    }

    toggleSelection(option: string) {
        const index = this.selectedOptions.indexOf(option);

        if (index > -1) {
            this.selectedOptions.splice(index, 1);
        } else {
            this.selectedOptions.push(option);
        }

        this.selectedLabel?.next(this.selectedOptions);
    }
}
