import { HTTPSolidError } from './httpSolidError'

export class InvalidCredentialsError extends HTTPSolidError {
    constructor() {
        super(401, 'Invalid credentials!')
    }
}