
import { AuthenticationError } from 'apollo-server';
import { DataSource } from 'apollo-datasource';
import jwt from 'jsonwebtoken';

import { assertValidCredentials, assertValidAccount } from '../../graphql/permissions';
import messageConstants from '../../constant/message';
import commonConstants from '../../constant/common';
import { isEmpty } from '../../utils';

class Auth extends DataSource {
  constructor() {
    super();
  }

  initialize = config => {
    this.context = config.context;
  }

  adminLogin = async ({ email, password, remember }) => {
    const user = await this.context.models.User.findOne({
      $or: [
        { email: { $regex: new RegExp('^' + email.toLowerCase() + '$', 'i') } },
        { userName: { $regex: new RegExp('^' + email.toLowerCase() + '$', 'i') } }
      ]
    });

    if (isEmpty(user)) {
      throw new AuthenticationError(messageConstants.AUTH_USER_NOT_FOUND);
    }

    assertValidAccount(user);
    assertValidCredentials(password, user.password);
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: remember ? commonConstants.REMEMBER_EXPIRE_TIME : commonConstants.EXPIRE_TIME
      }
    );

    return {
      token,
      user
    }
  }


  login = async ({ userName, password, remember }) => {
    userName = userName.trim();
    let user = await this.context.models.User.findOne({ userName: { $regex: new RegExp('^' + userName.toLowerCase() + '$', 'i') } });

    if (!isEmpty(user)) {
      assertValidAccount(user);
      assertValidCredentials(password, user.password);
    }

    try {
      const role = await this.context.dataSources.roleAPI.getRoleById({ _id: user.roleId });
      user.lastLoginAt = new Date();
      await this.context.models.User.upsertWithCache(user._id, user);

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: remember ? commonConstants.REMEMBER_EXPIRE_TIME : commonConstants.EXPIRE_TIME
        }
      );

      return {
        token,
        user
      }
    } catch (error) {
      console.log('[datasources AuthAPI login] error => ', error);
      throw new AuthenticationError(messageConstants.AUTH_INVALID_CREDENTIAL);
    }
  }
}

export default Auth;
