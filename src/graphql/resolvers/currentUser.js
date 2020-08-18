
const currentUserResolvers = {
  Query: {
    currentUser: async (parent, args, { dataSources }) => {
      const user = await dataSources.userAPI.getCurrentUser();
      return user;
    }
  }
};

export default currentUserResolvers;
