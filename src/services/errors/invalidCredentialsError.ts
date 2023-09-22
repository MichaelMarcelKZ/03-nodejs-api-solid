import { HTTPSolidError } from './httpSolidError'

export class InvalidCredentialsError extends HTTPSolidError {
    constructor() {
        super(400, 'Invalid credentials!')
    }
}