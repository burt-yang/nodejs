import mysql from 'mysql';
import RepoError from "../error/repoError";

class Database {

    constructor() {
        this.dbPool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            password: 'abcd123456',
            database: 'arch'
        });
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }


    query(sql, values) {
        return new Promise(((resolve, reject) => {
            database.dbPool.query(sql, values, (error, results, fields) => {
                if (error) reject(new RepoError(error));
                resolve(results);
            })
        }));
    }
}

const database = Database.getInstance();
export default database;