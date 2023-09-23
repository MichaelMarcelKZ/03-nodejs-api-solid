import { HTTPSolidError } from './httpSolidError'

export class LateCheckInValidationError extends HTTPSolidError {
    constructor() {
        super(400, 'The check-in can only be validated until 20 minutes of its creation')
    }
}