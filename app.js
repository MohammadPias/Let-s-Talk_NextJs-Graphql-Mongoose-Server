const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/schema/index");
const resolvers = require("./graphql/resolver/rootResolver");
const cookieParser = require("cookie-parser");
const { ApolloServer } = require("apollo-server-express");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
// const graphqlHTTP = require("express-graphql");

const { finished } = require('stream/promises');


const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser(process.env.COOKIE_PERSE))

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.o4muq.mongodb.net/chat-app?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected");
})

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
    });
    await server.start();
    // app.use(graphqlUploadExpress());
    app.use(
        "/graphql",
        graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
        // graphqlHTTP({ schema })
    )

    server.applyMiddleware({ app });
    await new Promise(r => app.listen({ port: 5000 }, r));
    console.log(`Server ready at http://localhost:5000${server.graphqlPath}`);
};
startServer();