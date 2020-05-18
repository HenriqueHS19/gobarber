import { ValidationError } from 'yup';

interface Errors {
    [key: string]: string;
}

export default function getValidationError(error: ValidationError): Errors {
    const setErrors: Errors = {};

    error.inner.forEach(function(err) {
        setErrors[err.path] = err.message;
    });

    return setErrors;
}