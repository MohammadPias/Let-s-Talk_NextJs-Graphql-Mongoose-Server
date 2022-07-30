const userResolver = require("./userResolvers");

const resolvers = {
    ...userResolver,
}
module.exports = resolvers;