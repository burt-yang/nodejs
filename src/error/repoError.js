import HttpError from './httpError';

export default class RepoError extends HttpError {

    constructor(error) {
        super(500, "database error");
        this.error = error;
    }
}