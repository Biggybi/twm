interface IUser {
  id: string;
  email: string;
  password: string;
}
export const Users = new Map<string, IUser>([
  ['Adri', {id: '0', email: 'Adri', password: '1234'}],
  ['Ana', {id: '1', email: 'Ana', password: 'red'}],
  ['Alex', {id: '2', email: 'Alex', password: 'alex'}],
  ['Trx', {id: '3', email: 'Trx', password: 'trx'}],
  ['Kev', {id: '4', email: 'Kev', password: 'kev'}],
]);
