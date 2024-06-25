export interface User {
    login: string;
    firstName: string;
    role: UserRole;
}

export type UserRole = 'user' | 'premium' | 'admin'

export interface Model {
    'name': 'string',
    'accuracy': 0,
    'loss': 0,
    'labels': [
        'string'
    ]
}
