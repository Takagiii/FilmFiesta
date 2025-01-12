import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
    Login,
    LoginResponse,
    RegisterResponse,
    SubscriptionResponse,
} from '../../interfaces/login';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoggedIn: boolean = false;
    isPremium: boolean = false;
    firstLaterName: string = '';
    name: string = '';
    email: string = '';
    subscriptionExpiration: Date | null = null;
    subscriptionType: string = '';
    id: number = -1;

    constructor(
        private http: HttpClient,
        public router: Router
    ) {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const id = localStorage.getItem('id');
        const subscriptionExpiration = localStorage.getItem('subscriptionExpiration');
        const isPremium = localStorage.getItem('isPremium') == 'true';

        if (token && email && id) {
            const idNumber = parseInt(id, 10);
            this.isPremium = isPremium;
            const date = subscriptionExpiration ? new Date(subscriptionExpiration) : undefined;
            this.setInfo(email, idNumber, isPremium, date);
        }
    }

    async login(email: string, password: string): Promise<boolean> {
        const params: Login = { email, password };

        const request = this.http.post(`${environment.apiUrl}/Login`, params);
        try {
            const response = await lastValueFrom(request);
            const data = response as LoginResponse;
            const isPremium = data.subscriptionType !== 0;

            this.loadUserInfo(data, email, isPremium);

            return true;
        } catch (_) {
            return false;
        }
    }

    async register(email: string, password: string, plan: string): Promise<boolean> {
        try {
            const request = this.http.post(`${environment.apiUrl}/Register`, {
                email,
                password,
                subscription: plan,
            });
            const response = await lastValueFrom(request);
            const parsedResponse = response as RegisterResponse;

            const isPremium = parsedResponse.subscriptionType !== 0;
            this.loadUserInfo(parsedResponse, email, isPremium);

            return true;
        } catch (_) {
            return false;
        }
    }

    logout(): void {
        this.clearInfo();
        AuthService.clearStorage();
        this.router.navigate(['/login']).then();
    }

    async subscribe(plan: string): Promise<boolean> {
        try {
            const request = this.http.post(`${environment.apiUrl}/Subscription`, {
                id: this.id,
                subscriptiontype: plan,
            });
            const response = await lastValueFrom(request);
            const parsedResponse = response as SubscriptionResponse;

            this.isPremium = true;
            this.subscriptionExpiration = new Date(parsedResponse.endDate);
            this.subscriptionType = "Premium";

            localStorage.setItem('subscriptionExpiration', this.subscriptionExpiration.toString());
            localStorage.setItem('isPremium', 'true');

            return true;
        } catch (_) {
            this.isPremium = false;
            this.subscriptionType = 'Free';
            return false;
        }
    }

    setInfo(email: string, id: number, isPremium?: boolean, expirationDate?: Date): void {
        if (isPremium) {
            this.isPremium = isPremium;
        }

        if (expirationDate) {
            this.subscriptionExpiration = expirationDate;
        }

        this.id = id;
        this.isLoggedIn = true;
        this.firstLaterName = email[0].toUpperCase();
        this.name = email.split('@')[0];
        this.email = email;
        this.subscriptionType = isPremium ? 'Premium' : 'Free';
    }

    loadUserInfo(data: LoginResponse | RegisterResponse, email: string, isPremium: boolean): void {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        localStorage.setItem('id', data.idUser.toString());
        if (isPremium) {
            localStorage.setItem('isPremium', 'true');
        }
        if (data.endSubscription) {
            localStorage.setItem('subscriptionExpiration', data.endSubscription);
            const endDate = new Date(data.endSubscription);
            this.setInfo(email, data.idUser, isPremium, endDate);
        } else {
            this.setInfo(email, data.idUser, isPremium);
        }
    }

    clearInfo() {
        this.isLoggedIn = false;
        this.isPremium = false;
        this.firstLaterName = '';
        this.name = '';
        this.email = '';
        this.subscriptionExpiration = null;
        this.subscriptionType = '';
        this.id = -1;
    }

    static clearStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        localStorage.removeItem('subscriptionExpiration');
        localStorage.removeItem('isPremium');
    }

    static logout() {
        AuthService.clearStorage();
        window.location.href = '/login';
    }
}
