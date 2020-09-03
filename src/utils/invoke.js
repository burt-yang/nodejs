export default function invoke(req, res, next, method) {
    let promise = method(req, res, next);
    promise.then(data => {
        res.status(200).json({msg: 'OK', code: 200, data: data});
    }).catch(err => {
        console.log(err);
        next(err);
    });
}