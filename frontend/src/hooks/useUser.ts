import { User } from 'types/User';

const useUser = (): User => ({
  id: 1,
  firstName: 'Luke',
  lastName: 'Skywalker',
  email: 'luke.skywalker@starwars.com',
});

export default useUser;
