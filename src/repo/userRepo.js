import database from '../middlewear/database'
import User from '../data/user'

class UserRepo {

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserRepo();
        }
        return this.instance;
    }

    async selectByUsername(username) {
        let results = await database.query('select u.username, u.password from user u where u.username = ?', [username])
        let userInfo = results[0];
        if (!userInfo) return;
        return new User(userInfo.username, userInfo.password)
    }

    async insertUser(user) {
        let results = await database.query("insert into user (email,username,password,first_name,las_name,photo_file_path,photo_file_type) values (?,?,?,?,?,?,?)", [user.email, user.username, user.password, user.firstName, user.lastName, user.photoFilePath, user.photoFileType])
        return results.affectedRows;
    }

    async updateUser(username, password) {
        let results = await database.query("update user set password = ? where username = ?", [password, username])
        return results.affectedRows;
    }

    async selectAllByPageable(pageNumber, pageSize) {
        return await database.query("select email,username,password,first_name,las_name,photo_file_path,photo_file_type from user limit ?,?", [pageNumber * pageSize, parseInt(pageSize)]);
    }
}

const userRepo = UserRepo.getInstance();
export default userRepo;

