import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, FormsModule, ReactiveFormsModule, TranslateModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    loginForm: FormGroup;
    isError: boolean = false;

    constructor(
        private authServices: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.isError = false;
            const email = this.loginForm.value.email;
            const password = this.loginForm.value.password;

            this.authServices.login(email, password).then((success: boolean) => {
                if (!success) {
                    this.isError = true;
                    return;
                }

                this.loginForm.reset();
                if (this.authServices.isPremium) {
                    this.router.navigate(['/all']).then();
                    return;
                }

                this.router.navigate(['/']).then();
            });
        }
    }
}
