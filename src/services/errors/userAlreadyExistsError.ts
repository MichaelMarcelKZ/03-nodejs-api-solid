import { HTTPSolidError } from './httpSolidError'

export class UserAlreadyExitsError extends HTTPSolidError {
    constructor() {
        super(409, 'E-mail already exists!')
    }
}