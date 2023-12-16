import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const projects = [...Array(24)].map((_, index) => ({
  id: faker.number.int({ min: 1, max: 100 }),
  name: capitalizeFirstLetter(faker.lorem.words({ min: 1, max: 3 })),
  description: faker.lorem.paragraph(),
  owner: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName()
  },
  status: sample(['OPEN', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELED', 'TESTING', 'DEPLOYED']),
  createdAt: faker.date.recent({ days: 200 })
}));

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}