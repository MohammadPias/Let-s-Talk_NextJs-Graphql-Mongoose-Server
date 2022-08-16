const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const User = require("../../models/userModel");
const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { ApolloError } = require("apollo-server-errors");

const userResolvers = {
    Upload: GraphQLUpload,
    Mutation: {
        createUser: async (parent, { user }) => {
            const {
                name,
                email,
                password,
                phone,
                role,
                avatar
            } = user;
            // console.log(avatar, user)
            const isExistUser = await User.findOne({ email: email });
            if (isExistUser) {
                throw new Error("User already exist!")
            }
            const hashPass = await bcrypt.hash(password, 12)

            const newUser = new User({
                name,
                email,
                password: hashPass,
                phone,
                role,
                avatar
            })
            try {
                await newUser.save();
                console.log("User saved successfully")
            } catch (err) {
                // console.log(err)
                throw new ApolloError("All fields are required", 400)
                /* const fields = Object.keys(err.errors)
                console.log(fields)
                fields.find(item => {
                    if (item === "name") {
                        throw new ApolloError("name is required", 400)
                    } else if (item === "email") {
                        throw new ApolloError("email is required", 400)
                    } else if (item === "phone") {
                        throw new ApolloError("phone is required", 400)
                    } else if (item === "role") {
                        throw new ApolloError("role is required", 400)
                    }
                }) */
            }


            return { msg: "User saved successfully" };
        },

        singleFileUpload: async (parent, { file }) => {
            console.log(file, parent)
            const { createReadStream, filename, mimetype, encoding } = await file;

            const stream = createReadStream();
            const pathName = path.join(__dirname, `./public/images/${filename}`);
            console.log(pathName, __dirname)
            await stream.pipe(fs.createWriteStream(`./public/images/${filename}`));

            return { url: `http://localhost:5000/images/${filename}` };
        },

    },

    Query: {
        getUser: async () => {
            console.log(arg.email)
        },

        signIn: async (parent, { email, password }) => {

            console.log(email, password)
            const user = await User.findOne({ email: email });
            // console.log("user", user)
            if (!user) {
                throw new Error("User does't exist!")
            }
            const isValidPass = await bcrypt.compare(password, user?.password);
            // console.log("pass", isValidPass)
            if (!isValidPass) {
                throw new Error("Password don't match!")
            }
            console.log(user.id, "user id")
            const token =
                jwt.sign({
                    name: user.name,
                    email: email,
                    _id: user._id,
                    role: user.role,
                }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return {
                id: user.id,
                token,
                expiresToken: 1,
            }
        },

        getAllUsers: async (parent, arg, context, info) => {
            console.log(context, "context")
            if (context.role === "admin") {
                const users = await User.find();
                return users;
            }
            else {
                throw new ApolloError("user unauthenticated!", 401)
                // throw new Error("user unauthenticated!")
            }
        }
    }
}



module.exports = userResolvers;