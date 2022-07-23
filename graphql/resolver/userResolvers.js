const User = require("../../models/userModel")
const userResolvers = {}
userResolvers.createUser = async (arg) => {

    console.log(arg)
    const {
        name,
        email,
        password,
        phone,
    } = arg.user;


    const newUser = new User({
        name,
        email,
        password,
        phone
    })
    await newUser.save()


    return { name, email };
}

module.exports = userResolvers;