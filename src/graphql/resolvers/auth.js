
import { objectMap, resolversWrapper } from '../../graphql/sentry';

const authResolvers = {
  Mutation: {
    login: async (parent, { userName, password, remember }, { dataSources }) => {
      return await dataSources.authAPI.login({ userName, password, remember });
    },
    adminLogin: async (parent, { email, password, remember }, { dataSources }) => {
      return await dataSources.authAPI.adminLogin({ email, password, remember });
    }
  }
};

export default objectMap(authResolvers, resolversWrapper);
