import { HTTPSolidError } from './httpSolidError'

export class MaxDistanceError extends HTTPSolidError {
    constructor() {
        super(400, 'Max distance reached.')
    }
}