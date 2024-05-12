import { UserState } from './types';
import avatar_1Url from 'src/assets/images/avatars/avatar_1.jpg';

export const unassignedUser = {
  id: -1,
  firstName: 'Unassigned',
  email: 'Unassigned',
  registered: false,
};

export const demoUser: UserState = {
  id: -2,
  google_id_sub: '-2',
  email: 'demouser@gmail.com',
  firstName: 'Joanne',
  lastName: 'Walker',
  createdAt: '1998-01-17T16:11:48.164Z',
  picture: avatar_1Url,
};
