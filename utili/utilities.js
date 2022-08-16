const jwt_decode = require("jwt-decode")

const getUser = (token) => {
    const decodedUser = jwt_decode(token);
    return decodedUser;
}

module.exports = {
    getUser
}