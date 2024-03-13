export interface IUsers {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  role: string;
  credentials: { username: string };
  profilePicture: string;
}

export interface ISocketUser {
  action: string;
  users: any;
}

export interface IUsersUsername {
  _id: string;
  username: string;
}
