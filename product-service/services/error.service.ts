export class HttpErrorService extends Error {
    statusCode: number;

    constructor (message = 'Unknown error', statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
