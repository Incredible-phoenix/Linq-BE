
import { seedUsers, dropUsers } from './user';

exports.seedData = async () => {
  console.log('seeding started.');
  await seedUsers();
  console.log('seeding ended.');
}

exports.dropData = async () => {
  console.log('dropping started.');
  await dropUsers();
  console.log('dropping ended.');
}
