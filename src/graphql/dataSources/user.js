import { DataSource } from 'apollo-datasource';
import { messages } from '../../constant/message';

class User extends DataSource {
  constructor() {
    super();
  }

  initialize = config => {
    this.context = config.context;
  }

  getUsers = async () => {
    try {
      return await this.context.models.User.find();
    } catch (error) {
      console.log('[ERROR]:getUsers', error);
      throw new SyntaxError(messages.SOMETHING_WENT_WRONG);
    }
  };

  getUserById = async ({ _id }) => {
    try {
      return await this.context.models.User.find({ _id });
    } catch (error) {
      console.log('[ERROR]:getUserById', error);
      throw new SyntaxError(messageConstants.SOMETHING_WENT_WRONG);
    }
  };
}

export default User;