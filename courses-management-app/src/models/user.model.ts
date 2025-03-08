export type UserRole =
    'teacher' |
    'student';

export class User {
    constructor(
        public email: string,
        public password: string,
        public id?: number,
        public name?: string,
        public role?: UserRole 
    ) {
    }
}