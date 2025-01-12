import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { AuthService } from '../../services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [ProfileComponent, TranslateModule, ReactiveFormsModule],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss',
})
export class AccountComponent {
    expirationDate: string;
    subscription: FormGroup;

    constructor(
        protected authService: AuthService,
        private formBuilder: FormBuilder
    ) {
        this.expirationDate = authService.subscriptionExpiration?.toLocaleDateString() || '';

        this.subscription = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirm: ['', Validators.required],
            subscription: ['', Validators.required],
        });
    }

    onSubmit() {
        const plan = this.subscription.value.subscription;
        this.authService.subscribe(plan).then((success: boolean) => {
            if (!success) return;
            const date = this.authService.subscriptionExpiration;
            this.expirationDate = date ? date.toLocaleDateString() : '';
            this.subscription.reset();
        });
    }
}
