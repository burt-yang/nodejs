export default class User {

    constructor(username, password, token) {
        this.username = username;
        this.password = password;
        this.token = token;
    }

    static newFromUpload(fields, file) {
        let user = new User();
        user.email = fields.email;
        user.password = fields.password;
        user.firstName = fields.firstName;
        user.lastName = fields.lastName;
        user.username = fields.username;
        user.photoFilePath = file.path;
        user.photoFileType = file.type;
        return user;
    }
}