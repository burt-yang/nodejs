import userService from '../service/userService'
import wrap from "../utils/wrap";
import formService from "../service/formService";
import User from "../data/user";

class UserController {

    constructor() {
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserController();
        }
        return this.instance;
    }

    async login(req) {
        return await wrap(userService.login(req.body.username, req.body.password));
    }

    async register(req) {
        let [fields, file] = await wrap(formService.parse(req));
        let user = User.newFromUpload(fields, file.photo);
        return await wrap(userService.register(user));
    }

    async resetPassword(req) {
        return await wrap(userService.resetPassword(req.body.username, req.body.password));
    }

    async getUsersPageable(req) {
        let pageNumber = req.query['pageNumber']
        let pageSize = req.query['pageSize']
        return await wrap(userService.getUsersPageable(pageNumber, pageSize));
    }
}

const userController = UserController.getInstance();
export default userController;