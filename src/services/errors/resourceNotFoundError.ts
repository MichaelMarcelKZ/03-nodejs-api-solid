import { HTTPSolidError } from './httpSolidError'

export class ResourceNotFoundError extends HTTPSolidError {
    constructor() {
        super(404, 'Resource not found!')
    }
}