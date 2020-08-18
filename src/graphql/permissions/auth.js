

import { AuthenticationError, ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';

import messageConstants from '../../constant/message';
import commonConstants from '../../constant/common';

const assertSession = () => {
  throw new ApolloError(messageConstants.AUTH_TOKEN_EXPIRED_ERROR, commonConstants.TOKEN_EXPIRED_CODE);
};

const assertAuthenticated = context => {
  if (!context.me) {
    throw new AuthenticationError(messageConstants.PERMISSION_AUTHENTICATED_ERROR);
  }
};

const assertValidCredentials = (password, hashPassword) => {
  const matchPasswords = bcrypt.compareSync(password, hashPassword);
  console.log("matchPasswords", matchPasswords)
  if (!matchPasswords) {
    throw new AuthenticationError(messageConstants.AUTH_INVALID_CREDENTIAL);
  }
};

const assertValidAccount = user => {
  if (user.status === commonConstants.USER_STATUS_TYPE.INACTIVE) {
    throw new AuthenticationError(messageConstants.AUTH_USER_STATUS_INACTIVE_ERROR);
  }
};

export {
  assertSession,
  assertAuthenticated,
  assertValidCredentials,
  assertValidAccount
};