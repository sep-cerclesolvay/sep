import { User } from 'types/User';

const useUser = (): User => ({
  id: 1,
  name: 'Admin',
  admin: true,
});

export default useUser;
