import { HTTPSolidError } from './httpSolidError'

export class MaxNumberOfCheckInsError extends HTTPSolidError {
    constructor() {
        super(400, 'Max number of check ins reached.')
    }
}