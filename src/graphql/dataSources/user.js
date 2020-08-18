
import { DataSource } from 'apollo-datasource';
import { SyntaxError } from 'apollo-server';
import { messages } from '../../constant/message';

import {
  assertSession,
  assertAuthenticated
} from '../../graphql/permissions';
import utils from '../../utils';

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

  getCurrentUser = async () => {
    assertAuthenticated(this.context);
    try {
      const me = this.context.me;
      const user = await this.context.models.User.find({ _id: me.id });
      if (utils.isEmpty(user)) {
        assertSession();
      }
      return user;
    } catch (error) {
      console.log('[ERROR]:getCurrentUser', error);
      assertSession();
    }
  };
}

export default User;