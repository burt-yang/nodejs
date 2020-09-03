import userRepo from '../repo/userRepo'
import HttpError from "../error/httpError";
import wrap from "../utils/wrap";
import jwt from "jsonwebtoken";

class UserService {

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    async login(username, password) {
        if (!username || !password) {
            throw new HttpError(404, "username or password can't not be empty");
        }

        let user = await wrap(userRepo.selectByUsername(username));

        if (!user) {
            throw new HttpError(404, username + " user not found");
        }

        if (user.password !== password) {
            throw new HttpError(401, username + " password is not validated");
        }

        user.token = jwt.sign({data: user.username}, 'secret', {expiresIn: '1h'});
        return user;
    }

    async register(user) {
        if (!user || !user.username || !user.email) {
            throw new HttpError(404, "username or email can't be empty");
        }

        return await userRepo.insertUser(user) > 0;
    }

    async resetPassword(username, password) {
        return await userRepo.updateUser(username, password) > 0;
    }

    async getUsersPageable(pageNumber, pageSize) {
        return await userRepo.selectAllByPageable(pageNumber, pageSize);
    }
}

const userService = UserService.getInstance();
export default userService;