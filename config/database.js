

const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri:'mongodb://localhost/To_do_db',
    secret :crypto,
    db:'To_do_db'
}