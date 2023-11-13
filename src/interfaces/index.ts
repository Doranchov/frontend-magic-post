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
    workPlace: string;
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

export interface District {
    _id: string;
    name: string;
    code: string;
    provinceId: string;
}

export interface Province {
    _id: string;
    name: string;
    code: string;
    districts: any[];
}
