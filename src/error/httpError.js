export default class HttpError extends Error {

    constructor(stateCode, message) {
        super();
        this.stateCode = stateCode;
        this.message = message;
    }
}