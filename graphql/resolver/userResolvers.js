const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const User = require("../../models/userModel");
const path = require("path");
const fs = require("fs")

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

            console.log(avatar, user)
            const newUser = new User({
                name,
                email,
                password,
                phone,
                role,
                avatar
            })
            await newUser.save(err => {
                if (!err) {
                    console.log("User saved successfully")
                } else {
                    throw err;
                }
            })


            return { name, email };
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

        }
    }
}



module.exports = userResolvers;