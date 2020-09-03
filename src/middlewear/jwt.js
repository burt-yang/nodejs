import jwt from 'express-jwt';

export default class Jwt {

    constructor() {

    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Jwt();
        }
        return this.instance;
    }
}