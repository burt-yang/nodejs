import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import userController from './controller/userController'
import invoke from "./utils/invoke";

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/login', (req, res, next) => invoke(req, res, next, userController.login));
app.post('/api/register', (req, res, next) => invoke(req, res, next, userController.register));
app.put('/api/resetPassword', (req, res, next) => invoke(req, res, next, userController.resetPassword));
app.get('/api/users', (req, res, next) => invoke(req, res, next, userController.getUsersPageable));

// app.use(jwt({secret: 'secret', algorithm: 'HS256'}).unless({path: ['/api/login']}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((error, req, res, next) => {
    if (error.stateCode) {
        res.status(error.stateCode).json({msg: error.message, code: error.stateCode})
    } else {
        res.status(500).json({msg: "System Internal Error", code: 500})
    }
});


app.listen(4321, () => {
    console.log('server running http://localhost:4321');
});