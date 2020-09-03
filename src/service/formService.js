import formidable from 'formidable';
import httpError from "../error/httpError";

class FormService {

    constructor() {
        this.form = formidable({multiples: true});
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new FormService();
        }
        return this.instance;
    }

    parse(req) {
        return new Promise(((resolve, reject) => {
            this.form.parse(req, (err, fields, files) => {
                if (err) reject(new httpError(400, "can't parse form data"))
                resolve([fields, files])
            });
        }));
    }
}

const formService = FormService.getInstance();
export default formService;