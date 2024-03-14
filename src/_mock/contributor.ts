import { faker } from '@faker-js/faker';
import { Contributor } from 'src/redux/types';

export const generateContributor = (): Contributor => {
  const c = {
    id: faker.number.int({ min: 10000, max: 99999 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    registered: true,
    email: '',
  };

  c.email = faker.internet.email({ firstName: c.firstName, lastName: c.lastName });
  return c;
};

export const demoContributors: Contributor[] = [...Array(24)].map((_, _index) =>
  generateContributor()
);
