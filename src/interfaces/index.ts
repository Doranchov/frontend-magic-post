export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    address: string;
    phone: string;
    avatar: string;
}

export interface Role {
    _id: string;
    slug: string;
    description: string;
    accounts: any[];
}
