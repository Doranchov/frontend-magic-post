export interface Account {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    address: string;
    phone: string;
    avatar: string;
    refreshToken: string;
    accessToken: string;
}

export interface Role {
    _id: string;
    code: string;
    description: string;
    accounts: any[];
}

export interface Token {
    _id: string;
    admin: boolean;
    iat: number;
    exp: number;
}
