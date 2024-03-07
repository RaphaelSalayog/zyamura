export interface IUsers {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  role: string;
  credentials: { username: string };
  profilePicture: string;
}
