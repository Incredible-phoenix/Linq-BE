
import User from './user';
import Auth from './auth';

const dataSources = () => ({
  userAPI: new User(),
  authAPI: new Auth(),
});


export default dataSources;