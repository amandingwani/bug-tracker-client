import { UserState } from "./types";

export const unassignedUser = {
    id: -1,
    firstName: 'Unassigned',
    email: 'Unassigned',
    registered: false,
};

export const demoUser: UserState = {
    id: -1,
    google_id_sub: '-1',
    email: 'demouser@gmail.com',
    firstName: 'Joanne',
    lastName: 'Walker',
    createdAt: "1998-01-17T16:11:48.164Z",
    picture: '/assets/images/avatars/avatar_1.jpg'
}