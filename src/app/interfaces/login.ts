export interface Login {
    email: string;
    password: string;
}

export interface SubscriptionResponse {
    id: number;
    endDate: string;
    startDate: string;
}

export interface RegisterResponse {
    errorMessages: string | null;
    idUser: number;
    isAuthSuccessful: boolean;
    subscriptionType: number;
    endSubscription: string | null;
    token: string;
}

export interface LoginResponse {
    idUser: number;
    isPremium: boolean;
    name: string;
    email: string;
    endSubscription: string | null;
    subscriptionType: number;
    token: string;
}
