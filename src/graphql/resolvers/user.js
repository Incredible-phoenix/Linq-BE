
const userResolvers = {
  Query: {
    users: async (parents, args, { dataSources }) => {
      return await dataSources.userAPI.getUsers();
    },
    user: async (parents, { _id }, { dataSources }) => {
      return await dataSources.userAPI.getUserById({ _id });
    }
  },
  // Mutation: {
  // }
}

export default userResolvers;