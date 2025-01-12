import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterLink, FormsModule, TranslateModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    registerForm: FormGroup;
    isPasswordMatch: boolean = true;
    isPasswordValid: boolean = true;

    constructor(
        private authServices: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirm: ['', Validators.required],
            subscription: ['', Validators.required],
        });
    }
    onSubmit() {
        this.isPasswordMatch = true;
        this.isPasswordValid = true;

        if (this.registerForm.value.password !== this.registerForm.value.confirm) {
            this.isPasswordMatch = false;
            return;
        }

        if (this.registerForm.valid) {
            const email = this.registerForm.value.email;
            const password = this.registerForm.value.password;
            const plan = this.registerForm.value.subscription;

            console.log(email, password, plan);

            this.authServices.register(email, password, plan).then((success: boolean) => {
                if (!success) {
                    this.isPasswordValid = false;
                    return;
                }

                this.registerForm.reset();
                if (this.authServices.isPremium) {
                    this.router.navigate(['/all']).then();
                    return;
                }

                this.router.navigate(['/']).then();
            });
        }
    }
}
