const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
var { graphqlHTTP } = require('express-graphql');
const schema = require("./graphql/schema/index");
const root = require("./graphql/resolver/rootResolver")


const app = express();

app.use(express.json())
app.use(cors())


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(5000, () => console.log('Now browse to localhost:5000/graphql'));


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.o4muq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function main() {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            throw err;
        }
    });
    console.log("Connected to DB")
}
main().catch(err => console.log(err));