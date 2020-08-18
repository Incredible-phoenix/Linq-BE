
import bcrypt from 'bcrypt';

import User from '../models/user';
import commonConstants from '../../constant/common';

exports.seedUsers = async () => {
  const users = [
    {
      email: 'user1@linqPay.com',
      password: '123456',
      userName: 'user1',
      phoneNumber: '+1 315 229 0823',
      address: '20 Cooper Square, New York, NY 10003, USA',
      thumbnail: 'https://s3.eu-central-1.amazonaws.com/stg.intustream.com/educator/1582213143836.jpg'
    },
    {
      email: 'user2@linqPay.com',
      password: '123456',
      userName: 'user2',
      phoneNumber: '+1 315 229 0823',
      address: '120 E 12th St, New York, NY 10003, USA',
      thumbnail: 'https://s3.eu-central-1.amazonaws.com/stg.intustream.com/educator/1582213143836.jpg'
    },
    {
      email: 'user3@linqPay.com',
      password: '123456',
      userName: 'user3',
      phoneNumber: '+1 315 229 0823',
      address: '75 3rd Ave, New York, NY 10003, USA',
      thumbnail: 'https://s3.eu-central-1.amazonaws.com/stg.intustream.com/educator/1582213143836.jpg'
    },
    {
      email: 'user4@linqPay.com',
      password: '123456',
      userName: 'user4',
      phoneNumber: '+1 315 229 0823',
      address: '33 3rd Ave, New York, NY 10003, USA',
      thumbnail: 'https://s3.eu-central-1.amazonaws.com/stg.intustream.com/educator/1582213143836.jpg'
    }
  ];

  for (const user of users) {
    const hashedPassword = bcrypt.hashSync(user.password, commonConstants.BYCRYPT_LENGTH);
    await User.create({
      ...user,
      password: hashedPassword
    });
  }
};

exports.dropUsers = async () => {
  await User.deleteMany({});
};