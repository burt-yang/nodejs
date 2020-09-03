export default function wrap(promise) {
    return promise.then(data => {
        return data;
    }).catch(err => {
        throw err;
    });
}