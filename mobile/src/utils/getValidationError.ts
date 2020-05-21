import { ValidationError } from 'yup';

interface Error {
    [key: string]: string;
}

export default function getValidationError(error: ValidationError): Error {
    const errors: Error = {};

    error.inner.forEach(function(err) {
        errors[err.path] = err.message;
    });

    return errors;
}