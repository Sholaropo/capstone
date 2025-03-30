import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Class representing a repository error.
 * Extends the built-in Error class to include an error code.
 */
export class RepositoryError extends Error {
    code: string;
    statusCode: number;

    /**
     * Creates a new RepositoryError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} code - The the http response code.
     */
    constructor(
        message: string,
        code: string,
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) {
        super(message);
        this.name = "RepositoryError";
        this.code = code;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, RepositoryError.prototype);
    }
}

/**
 * Class representing a service error.
 * Extends the built-in Error class to include an error code.
 */
export class ServiceError extends Error {
    code: string;
    statusCode: number;

    /**
     * Creates a new ServiceError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} code - The the http response code.
     */
    constructor(
        message: string,
        code: string,
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) {
        super(message);
        this.name = "ServiceError";
        this.code = code;
        this.statusCode = statusCode;
    }
}